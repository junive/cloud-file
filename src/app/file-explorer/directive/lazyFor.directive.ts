import {
    Input, Directive, ViewContainerRef,
    OnInit, TemplateRef, DoCheck,
    IterableDiffers, IterableDiffer, SimpleChanges, IterableChanges, OnChanges
  } from '@angular/core';
import { MyFile } from '../../_model/my-file';
  
  @Directive({
    selector: '[lazyFor][lazyForOf]'
  })
  export class LazyForDirective implements DoCheck, OnInit, OnChanges {
    
    private list: MyFile[] = [];

    private differ!: IterableDiffer<any>;

    constructor(private vcr: ViewContainerRef,
                private tpl: TemplateRef<any>,
                private differs: IterableDiffers) {
                    //console.log(document.getElementById("toto"))
                     //console.log(this.vcr.element);
                 }

    @Input()
    set lazyForOf(list: MyFile[]) {
      this.list = list;
      //this.differ = this.differs.find(this.list).create();
      for (let i = 0; i < this.list.length; i++) {
        this.vcr.createEmbeddedView(this.tpl, {
          $implicit: <MyFile>this.list[i],
          index: i
        });
      }
    }
  
    ngAfterViewInit() {
      /* for (let i =0; i<10000; i++) {
          const folder: MyFolder = this.fileList.addFolder({ name: 'Folder 0', parentId: "root" });
    
          this.fileExplorer.getFileContainer().createEmbeddedView(
             this.fileExplorer.getFileTemplate(), {
               $implicit : <MyFolder>folder,
               index: i
          });
         }
        
        this.fileList.sortbyNameASC();
        this.cdRef.detectChanges();
        */
     }

    ngOnInit(): void {
      if (!this.differ && this.list) {
        this.differ = this.differs.find(this.list).create(this.trackByFn);
      }
    }

    ngOnChanges(changes: SimpleChanges): void {
      console.log("Toto" + changes);
      if ('lazyForOf' in changes) {
        //console.log(changes);
        // React on ngForOf changes only once all inputs have been initialized
        const value = changes['lazyForOf'].currentValue;
        if (!this.differ && value) {
          this.differ = this.differs.find(value).create();
        }
      }
    }

    ngDoCheck(): void {
      if (this.differ) {
        const changes = this.differ.diff(this.lazyForOf);
        console.log(changes);
       // if (changes) this.applyChanges(changes);
      }
    }
  
    trackByFn(index: number, item: any) {
      console.log("YEAH");
      return index;
    }
 
  }