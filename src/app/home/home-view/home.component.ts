import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsListingComponent } from '../../pets-listing/pets-listing.component';
import { PetsListing } from '../../models/pets-listing';
import { HomeModule } from '../home.module';
import { HomeService } from '../home.service';

declare function showButtons(): void;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PetsListingComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent {
  constructor(private homeService: HomeService) {
    this.loadListData();
  }
  
  petsListingList: PetsListing[] = []
  showFilterOptions: boolean = false;

  @ViewChild('dogVideo') dogVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('catVideo') catVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('otherVideo') otherVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('backgroundPic') backgroundPic!: ElementRef<HTMLPictureElement>;
  

  /* CHANGE VIDEO BACKGROUND METHODS */
  
  hideallVideos() {
    this.dogVideo.nativeElement.classList.remove('show');
    this.catVideo.nativeElement.classList.remove('show');
    this.otherVideo.nativeElement.classList.remove('show');
    this.backgroundPic.nativeElement.classList.add('show');

    this.dogVideo.nativeElement.pause();
    this.catVideo.nativeElement.pause();
    this.otherVideo.nativeElement.pause();
  }

  playVideo(animalButton: 'dog' | 'cat' | 'other') {
    this.hideallVideos();

    const video = {
      dog: this.dogVideo,
      cat: this.catVideo,
      other: this.otherVideo,
    }
    const selectedVideo = video[animalButton];

    selectedVideo.nativeElement.classList.add('show');
    selectedVideo.nativeElement.muted = true;
    selectedVideo.nativeElement.play();
  }

  pauseVideo(animal: 'dog' | 'cat' | 'other'): void {
    const videoMap = {
      dog: this.dogVideo,
      cat: this.catVideo,
      other: this.otherVideo,
    };

    const selectedVideo = videoMap[animal];
    selectedVideo.nativeElement.pause();
    selectedVideo.nativeElement.classList.remove('show');
    this.backgroundPic.nativeElement.classList.add('show');
  }
  

  /* FILTER METHODS */

  loadListData(){
    this.petsListingList = this.homeService.getList();
  }

  //Function that is called upon clicking button Filter
  //Changes visibility of filteroptions
  toggleFilterOptions() {
    this.showFilterOptions = !this.showFilterOptions;
  }

  applyFilters() {
   this.homeService.applyFilters()
  }
  
  filterResults(name: string) {
    this.homeService.filterResults(name);
    this.loadListData();
  }

  filterByType(type: string) {
    this.homeService.filterByType(type);
    this.loadListData();
  }

  filterByGender(gender: string) {
    this.homeService.filterByGender(gender); 
    this.loadListData();
  }

  resetFilters() {
    this.homeService.resetFilters();
    this.loadListData();
    }
}
