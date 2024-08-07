import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dnd]',
  standalone: true
})
export class DndDirective {
  @Output() fileDropped = new EventEmitter<File>()

  @HostBinding('class.fileover')
  fileOver = false

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent){
    event.preventDefault()
    event.stopPropagation()

    this.fileOver = true
  } 
  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent){
    event.preventDefault()
    event.stopPropagation()

    this.fileOver = false
  } 
  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent){
    event.preventDefault()
    event.stopPropagation()

    this.fileOver = false

    this.fileDropped.emit(event.dataTransfer?.files[0])
  }
}
