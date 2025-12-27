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
  rocketBottom = signal(10);

  timelineSections = [
    {
      title: 'About Me',
      events: [
        {
          title: 'Surendra Ghimire',
          subtitle: '(Ard Nerus)',
          description: 'A passionate .Net developer',
          image: '/assets/imgs/myFace.jpg',
          tags: ['.Net (c#)']
        },
        {
          title: 'Address',
          subtitle: '',
          description: 'Godawari - 3, Lalitpur Nepal',
          image: '',
          tags: []
        },
        {
          title: 'Age',
          subtitle: '',
          description: 'Approx ~ 23 yo',
          image: '',
          tags: []
        },
        {
          title: 'Contact',
          subtitle: '+977 970-1428322',
          description: '+977 970-1428322, mr.ard.nerus@gmail.com',
          image: '',
          tags: []
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
          tags: ['Accounting', 'Computer', 'Optional Mathematics']
        },
        {
          title: '+2',
          subtitle: '2076 B.S. Batch',
          description: 'From Advance International Model School',
          image: '',
          tags: ['Science Faculty', 'Computer Optional']
        },
        {
          title: 'Bachelors In Computer Application (BCA)',
          subtitle: 'Ongoing',
          description: 'From AIMS International College. Affiliated by T.U.',
          image: '',
          tags: []
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
          tags: []
        },
        {
          title: 'Support',
          subtitle: '2080-2081',
          description: 'At IMS software Pvt. Ltd.',
          image: '',
          tags: []
        },
        {
          title: '.Net Developer',
          subtitle: '2081-Current',
          description: 'At IMS software Pvt. Ltd.',
          image: '',
          tags: []
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
          image: '/assets/imgs/transactEase.jpg',
          tags: ['Github: https://github.com/MrNerus/TransactEase', 'Frontend Only PoC: https://transactease.neruxin.com/login']
        },
        {
          title: 'Grade Sheet Generator',
          subtitle: 'Grade Sheet Generator',
          description: 'Convert Excel Sheet to Grade Sheet',
          image: '',
          tags: ['Github: https://github.com/MrNerus/GradeSheetGenerator']
        },
        {
          title: 'NumeriCall',
          subtitle: 'Statement Parser',
          description: 'Solve string "1 + 1" to 2 without eval() or their alternative.',
          image: '',
          tags: ['Github: https://github.com/MrNerus/NumeriCall']
        },
        {
          title: 'QuestionSmith',
          subtitle: 'Question Bank Management System',
          description: 'Generate a Question paper from random selection of questions.',
          image: '',
          tags: ['Github: https://github.com/MrNerus/Answersmith']
        },
        {
          title: 'MediNest',
          subtitle: 'Record Keeping',
          description: 'Central Hub for Medical Documents. (Developed on DAV Codefest 2025).',
          image: '',
          tags: ['Github: https://github.com/MrNerus/MediNest/tree/BackEndBranch']
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
          image: '/assets/imgs/savanaSushi.jpg',
          tags: ['Visit Website: https://savanasushiandgrill.com/']
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
          image: '/assets/imgs/cursedMusicPlayer.jpg',
          tags: ['Demo: https://mrnerus.github.io/cursedMusicPlayer/']
        },
      ]
    },
  ];

  personalDetails = {
    title: 'Hi! I am Ard Nerus.',
    subtitle: 'Formally known as Surendra Ghimire.',
    description: 'Exploring the digital frontier, one pixel at a time.',
    image: 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?q=80&w=2670&auto=format&fit=crop',
    tags: ['Angular', 'React', 'TypeScript', 'JavaScript']
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
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const scrollPercent = scrollPosition / (docHeight - windowHeight);

    const startBottom = 10;
    const endBottom = 90;
    const currentBottom = startBottom + (scrollPercent * (endBottom - startBottom));

    this.rocketBottom.set(currentBottom);
  }
}