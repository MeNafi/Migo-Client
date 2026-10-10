"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Camera, Check, ImagePlus, Link2, Trash2, X, ZoomIn, ZoomOut } from "lucide-react";
import { toast } from "sonner";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { errMsg } from "@/lib/migo/api";
import { displayName, useAuth } from "@/lib/migo/auth";
import { userService } from "@/lib/migo/services";

const MAX_KB = 800;
const CROP_SIZE = 320;

/**
 * Profile photo upload with crop, save, and delete for every role.
 * Sends the image to PATCH /users/me/photo, then syncs the auth store + ["me"] query.
 */
export function PhotoUploader() {
  const user = useAuth((s) => s.user);
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [raw, setRaw] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [cropOpen, setCropOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  const drawCrop = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = CROP_SIZE;
    canvas.width = size;
    canvas.height = size;
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, size, size);
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const base = Math.max(size / iw, size / ih) * zoom;
    const dw = iw * base;
    const dh = ih * base;
    const dx = (size - dw) / 2 + offset.x;
    const dy = (size - dh) / 2 + offset.y;
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }, [zoom, offset]);

  useEffect(() => {
    if (!cropOpen || !raw) return;
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      requestAnimationFrame(() => drawCrop());
    };
    img.src = raw;
  }, [cropOpen, raw, drawCrop]);

  useEffect(() => {
    if (cropOpen) drawCrop();
  }, [zoom, offset, cropOpen, drawCrop]);

  if (!user) return null;
  const src = preview ?? user.profile?.photoUrl ?? "";

  async function readFile(file?: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Please choose an image file");
    if (file.size > MAX_KB * 1024 * 3) return toast.error(`Image is too large — keep it under ${MAX_KB * 3} KB before crop`);
    const dataUrl = await new Promise<string>((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result as string);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
    setRaw(dataUrl);
    setCropOpen(true);
  }

  function applyCrop() {
    const img = imgRef.current;
    if (!img) return;
    const out = document.createElement("canvas");
    out.width = CROP_SIZE;
    out.height = CROP_SIZE;
    const ctx = out.getContext("2d");
    if (!ctx) return;
    const size = CROP_SIZE;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const base = Math.max(size / iw, size / ih) * zoom;
    const dw = iw * base;
    const dh = ih * base;
    const dx = (size - dw) / 2 + offset.x;
    const dy = (size - dh) / 2 + offset.y;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(img, dx, dy, dw, dh);
    const dataUrl = out.toDataURL("image/jpeg", 0.88);
    const approxKb = Math.round((dataUrl.length * 0.75) / 1024);
    if (approxKb > MAX_KB) {
      toast.error(`Cropped image is ~${approxKb} KB — zoom out or choose a smaller photo (max ${MAX_KB} KB)`);
      return;
    }
    setPreview(dataUrl);
    setCropOpen(false);
    setRaw(null);
  }

  async function commit(photoUrl: string, done: string) {
    setBusy(true);
    try {
      await userService.photo(photoUrl);
      const me = await userService.me();
      useAuth.setState({ user: me?.user ?? me });
      await qc.invalidateQueries({ queryKey: ["me"] });
      setPreview(null);
      setUrl("");
      toast.success(done);
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setBusy(false);
    }
  }

  function onPointerDown(e: React.PointerEvent) {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    drag.current = { sx: e.clientX, sy: e.clientY, ox: offset.x, oy: offset.y };
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current) return;
    setOffset({
      x: drag.current.ox + (e.clientX - drag.current.sx),
      y: drag.current.oy + (e.clientY - drag.current.sy),
    });
  }
  function onPointerUp() {
    drag.current = null;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <Avatar name={displayName(user)} src={src} className="h-24 w-24 text-3xl" />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          aria-label="Change profile photo"
          title="Change photo"
          className="press absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-on-primary shadow-md hover:bg-primary-hover"
        >
          <Camera className="h-4 w-4" />
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            readFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>

      {preview ? (
        <div className="flex flex-wrap justify-center gap-2">
          <Button size="sm" loading={busy} onClick={() => commit(preview, "Profile photo updated")}>
            <Check className="h-4 w-4" /> Save photo
          </Button>
          <Button size="sm" variant="ghost" disabled={busy} onClick={() => setPreview(null)}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex w-full max-w-xs flex-col items-center gap-2">
          <Button size="sm" variant="secondary" disabled={busy} onClick={() => fileRef.current?.click()}>
            <ImagePlus className="h-4 w-4" /> Upload &amp; crop
          </Button>
          {src ? (
            <Button size="sm" variant="ghost" className="text-danger" disabled={busy} onClick={() => commit("", "Profile photo removed")}>
              <Trash2 className="h-4 w-4" /> Delete photo
            </Button>
          ) : null}
          <div className="flex w-full items-center gap-1.5">
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="…or paste image URL" className="h-9 text-xs" />
            <Button
              size="sm"
              className="h-9 shrink-0 px-3"
              disabled={busy || !/^https?:\/\/.+/.test(url)}
              onClick={() => commit(url.trim(), "Profile photo updated")}
            >
              <Link2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      <p className="text-center text-[11px] leading-snug text-muted">JPG/PNG — crop to circle, max ~{MAX_KB} KB after save.</p>

      {cropOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-label="Crop profile photo">
          <div className="w-full max-w-md rounded-3xl bg-surface p-5 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-extrabold">Crop photo</h3>
              <button type="button" aria-label="Close" className="press flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream" onClick={() => { setCropOpen(false); setRaw(null); }}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mx-auto overflow-hidden rounded-full border-2 border-line bg-black" style={{ width: CROP_SIZE, height: CROP_SIZE, maxWidth: "100%" }}>
              <canvas
                ref={canvasRef}
                className="h-full w-full touch-none cursor-move"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              />
            </div>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button type="button" aria-label="Zoom out" className="press flex h-10 w-10 items-center justify-center rounded-full bg-cream" onClick={() => setZoom((z) => Math.max(0.5, z - 0.15))}>
                <ZoomOut className="h-5 w-5" />
              </button>
              <span className="min-w-[3rem] text-center text-sm font-semibold">{Math.round(zoom * 100)}%</span>
              <button type="button" aria-label="Zoom in" className="press flex h-10 w-10 items-center justify-center rounded-full bg-cream" onClick={() => setZoom((z) => Math.min(3, z + 0.15))}>
                <ZoomIn className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-center text-xs text-muted">Drag to reposition · use zoom controls</p>
            <div className="mt-4 flex gap-2">
              <Button className="flex-1" onClick={applyCrop}>
                <Check className="h-4 w-4" /> Apply crop
              </Button>
              <Button variant="secondary" className="flex-1" onClick={() => { setCropOpen(false); setRaw(null); }}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
