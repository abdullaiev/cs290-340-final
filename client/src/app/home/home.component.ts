import {Component, OnInit, OnDestroy} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {Subscription} from "rxjs";

import {UserService} from "../../services/user.service";
import {User} from "../../types/user.type";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    slides: any[] = [
        {
            img: 'books.jpg',
            text: 'Explore the world of best rated books'
        },
        {
            img: 'dublin_library.jpg',
            text: 'Get in touch with authors'
        },
        {
            img: 'powell_bookstore.jpg',
            text: 'Become a reviewer today'
        }
    ];
    currentSlideIndex = 0;
    intervalID;
    userSubscription: Subscription;
    user: User;

    constructor(private sanitizer: DomSanitizer,
                private userService: UserService) {
    }

    ngOnInit() {
        this.initSlides();
        this.startSlideShow();
        this.getCurrentUser();
        this.subscribeToCurrentUserChanges();
    }

    initSlides() {
        this.slides.forEach(
            (slide, index) => {
                let img = `background-image: url(./assets/${slide.img})`;
                let position = `transform: translateX(-${index * 100}%`;

                this.slides[index] = {
                    img: this.sanitizer.bypassSecurityTrustStyle(img),
                    position: this.sanitizer.bypassSecurityTrustStyle(position),
                    text: slide.text
                }
            }
        );
    }

    startSlideShow() {
        this.intervalID = setInterval(
            () => {
                if (this.currentSlideIndex === (this.slides.length - 1)) {
                    this.currentSlideIndex = 0;
                } else {
                    this.currentSlideIndex++;
                }
            }, 4000);
    }

    restartTimer() {
        clearInterval(this.intervalID);
        this.startSlideShow();
    }

    setCurrentSlide(index: number) {
        this.currentSlideIndex = index;
        this.restartTimer();
    }

    subscribeToCurrentUserChanges() {
        this.userSubscription = this.userService.userEmitter.subscribe((user: User) => {
            this.user = user;
        });
    }

    getCurrentUser() {
        this.user = this.userService.getCurrentUser();
    }

    ngOnDestroy() {
        clearInterval(this.intervalID);
    }
}
