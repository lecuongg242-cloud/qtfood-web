"use client";

import clsx from "clsx";
import { useFormStatus } from "react-dom";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "@/components/ui/icons";

const control =
  "w-full rounded-xl border bg-card px-4 text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70 focus:border-[#4cb448] focus:ring-4 focus:ring-[#4cb448]/15";
const errorRing = "border-[#d9161e]/70 focus:border-[#d9161e] focus:ring-[#d9161e]/15";

type FieldProps = { label: string; name: string; required?: boolean; error?: string; hint?: string; children: ReactNode; className?: string };

export function Field({ label, name, required, error, hint, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold">
        {label}
        {required && <span className="text-[#d9161e]"> *</span>}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-sm text-[#c01018]">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-sm text-muted">{hint}</p>
      )}
    </div>
  );
}

type ControlProps = { error?: string };

export function Input({ error, className, name, ...rest }: ComponentProps<"input"> & ControlProps) {
  return (
    <input
      id={name}
      name={name}
      aria-invalid={Boolean(error) || undefined}
      aria-describedby={error ? `${name}-error` : undefined}
      className={clsx(control, "h-12", error && errorRing, className)}
      {...rest}
    />
  );
}

export function Textarea({ error, className, name, ...rest }: ComponentProps<"textarea"> & ControlProps) {
  return (
    <textarea
      id={name}
      name={name}
      rows={4}
      aria-invalid={Boolean(error) || undefined}
      aria-describedby={error ? `${name}-error` : undefined}
      className={clsx(control, "resize-y py-3 leading-relaxed", error && errorRing, className)}
      {...rest}
    />
  );
}

export function Select({
  error,
  className,
  name,
  options,
  placeholder,
  ...rest
}: ComponentProps<"select"> & ControlProps & { options: string[]; placeholder?: string }) {
  return (
    <div className="relative">
      <select
        id={name}
        name={name}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={clsx(control, "h-12 appearance-none pr-10", error && errorRing, className)}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

/** Nhóm lựa chọn dạng viên thuốc (radio) */
export function Choice({
  name,
  options,
  defaultValue,
}: {
  name: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
}) {
  return (
    <div role="radiogroup" className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label key={o.value} className="cursor-pointer">
          <input type="radio" name={name} value={o.value} defaultChecked={defaultValue === o.value} className="peer sr-only" />
          <span className="inline-flex h-11 items-center rounded-full border border-line bg-card px-4 text-sm font-semibold transition-colors duration-200 hover:border-[#4cb448] peer-checked:border-[#4cb448] peer-checked:bg-[#4cb448] peer-checked:text-[#0f230f] peer-focus-visible:ring-4 peer-focus-visible:ring-[#4cb448]/25">
            {o.label}
          </span>
        </label>
      ))}
    </div>
  );
}

export function Checkbox({ name, children, error, defaultChecked }: { name: string; children: ReactNode; error?: string; defaultChecked?: boolean }) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          aria-invalid={Boolean(error) || undefined}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-[#4cb448]"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p role="alert" className="mt-1.5 text-sm text-[#c01018]">
          {error}
        </p>
      )}
    </div>
  );
}

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn-primary w-full justify-center disabled:cursor-wait disabled:opacity-70 sm:w-auto">
      <span>{pending ? "Đang gửi…" : children}</span>
      {pending ? (
        <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <ArrowRight className="btn-arrow h-4 w-4" />
      )}
    </button>
  );
}
