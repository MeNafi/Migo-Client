"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { create } from "zustand";
import { Button } from "./button";

type S = { open: boolean; message: string; resolve?: (v: boolean) => void };
const useConfirm = create<S>(() => ({ open: false, message: "" }));

/** Promise-based replacement for window.confirm: `if (await confirmAsync("Cancel ride?")) ...` */
export const confirmAsync = (message: string) =>
  new Promise<boolean>((resolve) => useConfirm.setState({ open: true, message, resolve }));

export function ConfirmHost() {
  const { open, message, resolve } = useConfirm();
  const close = (v: boolean) => { resolve?.(v); useConfirm.setState({ open: false, resolve: undefined }); };
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && close(false)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md space-y-4 rounded-3xl bg-surface p-6 shadow-2xl sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2">
          <Dialog.Title className="text-lg font-extrabold">Are you sure?</Dialog.Title>
          <Dialog.Description className="text-sm text-muted">{message}</Dialog.Description>
          <div className="grid grid-cols-2 gap-2"><Button variant="secondary" onClick={() => close(false)}>Go back</Button><Button onClick={() => close(true)}>Confirm</Button></div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
