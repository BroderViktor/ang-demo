import { Directive, ElementRef, input, OnInit, Renderer2 } from '@angular/core';
import { cn } from '../../lib/utils';

const options = {
  base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  variant: {
    default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
    destructive:
      'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
    outline:
      'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
    trueoutline:
      'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
    secondary:
      'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  },
  size: {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-10 rounded-md px-8',
    icon: 'h-9 w-9',
  },
} as const;

type InputOptions = keyof (typeof options)['variant'];
type InputSize = keyof (typeof options)['size'];

/**
 * Directive to apply custom input styles based on the variant class.
 *
 * @example
 * <button obButton size="default" variant="default">Text\</button>
 */
@Directive({
  selector: '[obButton]',
})
export class ObButtonDirective implements OnInit {
  /**
   * The variant class to apply to the button element.
   *
   * @default 'default'
   */
  readonly variant = input<InputOptions>('default');
  /**
   * The variant class to apply to the button element.
   *
   * @default 'default'
   */
  readonly size = input<InputSize>('default');

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const existing = this.el.nativeElement.getAttribute('class') || '';

    const mergeClassname = cn(
      options.base,
      options.variant[this.variant()],
      options.size[this.size()],
      existing
    );
    this.renderer.setAttribute(this.el.nativeElement, 'class', mergeClassname);
  }
}
