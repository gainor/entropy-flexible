import { cva, type VariantProps } from "cva"
import { twMerge } from "tailwind-merge"

/**
 * Box
 */
export type BoxProps = VariantProps<typeof box>
export const box = cva(["box box-border"], {
  variants: {
    margin: { 0: "m-0", 2: "m-2", 4: "m-4", 8: "m-8" },
    padding: { 0: "p-0", 2: "p-2", 4: "p-4", 8: "p-8" },
  },
  defaultVariants: {
    margin: 0,
    padding: 0,
  },
})

/**
 * Card
 */
type CardBaseProps = VariantProps<typeof cardBase>
const cardBase = cva(
  ["card border-solid border-slate-300 rounded-object bg-secondary"],
  {
    variants: {
      shadow: {
        md: "drop-shadow-md",
        lg: "drop-shadow-lg",
        xl: "drop-shadow-xl",
      },
    },
  }
)

export interface CardProps extends BoxProps, CardBaseProps {}
export const card = ({ margin, padding, shadow }: CardProps = {}) =>
  twMerge(box({ margin, padding }), cardBase({ shadow }))
