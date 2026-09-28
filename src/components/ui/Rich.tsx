import { Fragment } from "react";

/** Hiển thị chuỗi có đánh dấu `*nhấn mạnh*` → <em> (font serif nghiêng, màu nhấn). */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em key={i}>{part.slice(1, -1)}</em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
