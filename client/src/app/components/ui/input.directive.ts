import { Directive, ElementRef, input, OnInit, Renderer2 } from '@angular/core';
import { cn } from '../../lib/utils';

const options = {
  base: 'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  default: 'bg-amber-200',
  blue: 'bg-blue-200',
  green: 'bg-green-200',
} as const;

type InputOptions = keyof typeof options;

/**
 * Directive to apply custom input styles based on the variant class.
 *
 * Usage:
 * <input obInput [variantClass]="'green'" />
 */
@Directive({
  selector: '[obInput]',
})
export class ObInputDirective implements OnInit {
  /**
   * The variant class to apply to the input element.
   *
   * @default 'default'
   */
  readonly variantClass = input<InputOptions>('default');

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const existing = this.el.nativeElement.getAttribute('class') || '';
    console.log({
      test: options[this.variantClass()],
      variantClass: this.variantClass,
    });
    const mergeClassname = cn(
      options.base,
      options[this.variantClass()],
      existing
    );
    this.renderer.setAttribute(this.el.nativeElement, 'class', mergeClassname);
  }
}
