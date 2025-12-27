import { Component, HostListener, signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Info } from './components/info/info';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Info],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  showCards: boolean = false;
  rocketBottom = signal(-20);
  showReachOut = signal(false);

  toggleReachOut() {
    this.showReachOut.update((val) => !val);
  }

  timelineSections = [
    {
      title: 'About Me',
      events: [
        {
          title: 'Surendra Ghimire',
          subtitle: '(Ard Nerus)',
          description: 'A passionate .Net developer',
          image: 'assets/imgs/myFace.jpg',
          tags: ['.Net (c#)'],
          allowBodyInteraction: false,
        },
        {
          title: 'Address',
          subtitle: '',
          description: 'Godawari - 3, Lalitpur Nepal',
          image: '',
          tags: [],
          allowBodyInteraction: false,
        },
        {
          title: 'Age',
          subtitle: '',
          description: 'Approx ~ 23 yo',
          image: '',
          tags: [],
          allowBodyInteraction: false,
        },
        {
          title: 'Contact',
          subtitle: '',
          description: '+977 970-1428322, mr.ard.nerus@gmail.com',
          image: '',
          tags: [],
          allowBodyInteraction: true,
        }
      ]
    },
    {
      title: 'Educations',
      events: [
        {
          title: 'Secondary Education (SEE)',
          subtitle: '2074 B.S. Batch',
          description: 'From Suryodaya Educational Development Academy',
          image: '',
          tags: ['Accounting', 'Computer', 'Optional Mathematics'],
          allowBodyInteraction: false,
        },
        {
          title: '+2',
          subtitle: '2076 B.S. Batch',
          description: 'From Advance International Model School',
          image: '',
          tags: ['Science Faculty', 'Computer Optional'],
          allowBodyInteraction: false,
        },
        {
          title: 'Bachelors In Computer Application (BCA)',
          subtitle: 'Ongoing',
          description: 'From AIMS International College. Affiliated by T.U.',
          image: '',
          tags: [],
          allowBodyInteraction: false,
        }
      ]
    },
    {
      title: 'Professional Experience',
      events: [
        {
          title: 'IT Person + Exam Coordinator',
          subtitle: '2078-2080',
          description: 'At AIMS International College',
          image: '',
          tags: [],
          allowBodyInteraction: false,
        },
        {
          title: 'Support',
          subtitle: '2080-2081',
          description: 'At IMS software Pvt. Ltd.',
          image: '',
          tags: [],
          allowBodyInteraction: false,
        },
        {
          title: '.Net Developer',
          subtitle: '2081-Current',
          description: 'At IMS software Pvt. Ltd.',
          image: '',
          tags: [],
          allowBodyInteraction: false,
        }
      ]
    },
    {
      title: 'Personal Projects',
      events: [
        {
          title: 'TransactEase',
          subtitle: 'Membership Card Management System',
          description: 'A membership card management system built using .Net Core and Angular. (username: admin, password: admin) for Forntend only PoC',
          image: 'assets/imgs/transactEase.jpg',
          tags: ['Github: https://github.com/MrNerus/TransactEase', 'Frontend Only PoC: https://transactease.neruxin.com/login'],
          allowBodyInteraction: false,
        },
        {
          title: 'Grade Sheet Generator',
          subtitle: 'Grade Sheet Generator',
          description: 'Convert Excel Sheet to Grade Sheet',
          image: '',
          tags: ['Github: https://github.com/MrNerus/GradeSheetGenerator'],
          allowBodyInteraction: false,
        },
        {
          title: 'NumeriCall',
          subtitle: 'Statement Parser',
          description: 'Solve string "1 + 1" to 2 without eval() or their alternative.',
          image: '',
          tags: ['Github: https://github.com/MrNerus/NumeriCall'],
          allowBodyInteraction: false,
        },
        {
          title: 'QuestionSmith',
          subtitle: 'Question Bank Management System',
          description: 'Generate a Question paper from random selection of questions.',
          image: '',
          tags: ['Github: https://github.com/MrNerus/Answersmith'],
          allowBodyInteraction: false,
        },
        {
          title: 'MediNest',
          subtitle: 'Record Keeping',
          description: 'Central Hub for Medical Documents. (Developed on DAV Codefest 2025).',
          image: '',
          tags: ['Github: https://github.com/MrNerus/MediNest/tree/BackEndBranch'],
          allowBodyInteraction: false,
        },
      ]
    },
    {
      title: 'On Production',
      events: [
        {
          title: 'Savana Sushi',
          subtitle: 'User Interface for Portuguese Restaurant',
          description: 'Client already had dedicated services for reservation, order management, etc. They needed centralized place to redirect to those services.',
          image: 'assets/imgs/savanaSushi.jpg',
          tags: ['Visit Website: https://savanasushiandgrill.com/'],
          allowBodyInteraction: false,
        },
      ]
    },
    {
      title: 'Disasterpiece (Oops-tional Ideas)',
      events: [
        {
          title: 'Music Player',
          subtitle: '',
          description: 'Too loud?',
          image: 'assets/imgs/cursedMusicPlayer.jpg',
          tags: ['Demo: https://mrnerus.github.io/cursedMusicPlayer/'],
          allowBodyInteraction: false,
        },
      ]
    },
  ];

  personalDetails = {
    title: 'Hi! I am Ard Nerus.',
    subtitle: 'Formally known as Surendra Ghimire.',
    description: 'Exploring the digital frontier, one pixel at a time.',
    reachOutLinks: [
      {
        name: 'Email Me',
        url: 'https://mail.google.com/mail/?view=cm&fs=1&to=mr.ard.nerus@gmail.com&su=Interview%20Request%20%E2%80%94%20Let%E2%80%99s%20See%20If%20We%E2%80%99re%20a%20Good%20Match%20%F0%9F%99%82&body=Hi%20Ard,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20move%20forward%20with%20an%20interview.%0A%0AWe%20think%20your%20skills%20and%20experience%20could%20be%20a%20good%20fit%20for%20our%20team,%20and%20we%E2%80%99d%20like%20to%20have%20a%20conversation%20to%20explore%20this%20further.%0A%0ALooking%20forward%20to%20speaking%20with%20you%20and%20seeing%20if%20we%20can%20work%20well%20together.%0A%0ABest%20regards,%0A',
        icon: 'email'
      },
      {
        name: 'Download CV',
        url: 'assets/pdfs/cv.pdf',
        icon: 'download'
      }
    ]
  };

  constructor() {
    effect(() => {
      // Optional: Add side effects if needed
    });
  }

  ngOnInit() { }

  ngAfterViewInit() {
    setTimeout(() => (this.showCards = true));
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollPosition = window.scrollY;

    // Config: How many pixels of scrolling it takes for the rocket to fly from bottom to top
    const flightDistance = 1000; // Adjust this to make it faster/slower relative to scroll

    // Map scroll 0 -> flightDistance to -20 -> 120
    // Start at -20% (hidden below)
    // End at 120% (hidden above)
    const startPos = -20;
    const endPos = 120;

    const progress = Math.min(scrollPosition / flightDistance, 1);
    const currentBottom = startPos + (progress * (endPos - startPos));

    this.rocketBottom.set(currentBottom);
  }
}