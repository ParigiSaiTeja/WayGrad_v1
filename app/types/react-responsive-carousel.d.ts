declare module 'react-responsive-carousel' {
    import * as React from 'react';
  
    export interface CarouselProps {
      showArrows?: boolean;
      showStatus?: boolean;
      showIndicators?: boolean;
      infiniteLoop?: boolean;
      showThumbs?: boolean;
      useKeyboardArrows?: boolean;
      autoPlay?: boolean;
      stopOnHover?: boolean;
      interval?: number;
      transitionTime?: number;
      swipeScrollTolerance?: number;
      dynamicHeight?: boolean;
      emulateTouch?: boolean;
      autoFocus?: boolean;
      thumbWidth?: number;
      selectedItem?: number;
      onClickItem?: (index: number, item: React.ReactNode) => void;
      onChange?: (index: number, item: React.ReactNode) => void;
      onClickThumb?: (index: number, item: React.ReactNode) => void;
      axis?: 'horizontal' | 'vertical';
      centerMode?: boolean;
      centerSlidePercentage?: number;
      swipeable?: boolean;
      stopPropagation?: boolean;
      children?: React.ReactNode;
    }
  
    export class Carousel extends React.Component<CarouselProps> {}
  }
  