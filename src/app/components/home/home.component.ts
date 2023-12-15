import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { interval, Subscription } from 'rxjs';

import { MeuMenuItem } from '../../models/meu-menu-item';
import { Repository } from '../../models/repository';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ToolbarModule,
    ButtonModule,
    TabMenuModule,
    AccordionModule,
    CardModule,
    MenuModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  //Readonly
  textoHome: string = 'BackEnd Software Engineer';
  mostrarImagem: boolean = false;
  mostrarMenu: boolean = false;
  items!: MeuMenuItem[];
  repositories!: Repository[];
  larguraDaTelaMaiorQue510: boolean = window.innerWidth > 550;
  itemsMenu: MenuItem[] = [];

  //IoC
  private subscription!: Subscription;

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.larguraDaTelaMaiorQue510 = window.innerWidth > 550;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Obtém a posição vertical da página ao rolar
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Define se a imagem deve ser mostrada com base na posição de rolagem
    this.mostrarImagem = scrollPosition >= window.innerHeight - 100;
  }

  mudarLink(indexElement: number) {
    this.items.forEach((elemento, index) => {
      if (index == indexElement) {
        elemento.clicked = true;
      } else {
        elemento.clicked = false;
      }

      let elementoByID;
      switch(indexElement){
        case 0:
          elementoByID = document.getElementById('home');

          if (elementoByID) {
            elementoByID.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        break;
        case 1:
          elementoByID = document.getElementById('sobre');

          if (elementoByID) {
            elementoByID.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        break;
        case 2:
          elementoByID = document.getElementById('experiencia');

          if (elementoByID) {
            elementoByID.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        break;
        default:
          elementoByID = document.getElementById('projetos');

          if (elementoByID) {
            elementoByID.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        break;
      }
    });
  }

  navToRepository(repo:Repository){
    // this.router.navigateByUrl(repo.link);
    window.open(repo.link, '_blank');
  }

  ngOnInit() {
    this.primengConfig.ripple = true;

    // Repositories
    this.repositories = [
      {
        name: 'api-video-locadora',
        description: 'Implementação de uma API em Java com Spring Boot para uma suposta Locadora de estudo de caso. Clique aqui para maiores detalhes!',
        link: 'https://github.com/lgustavogomdam/api-video-locadora',
        techs: [
          {name: 'Java'},
          {name: 'Spring-Boot'},
          {name: 'Hibernate'},
          {name: 'PostgreSQL'}
        ]
      },
      {
        name: 'app-video-locadora',
        description: 'Implementação da interface em HTML, SCSS, TS e JS com Angular Framework para uma suposta Locadora de estudo de caso. Clique aqui para maiores detalhes!',
        link: 'https://github.com/lgustavogomdam/app-video-locadora',
        techs: [
          {name: 'HTML'},
          {name: 'SCSS'},
          {name: 'Typescript'},
          {name: 'Javascript'},
          {name: 'Angular'}
        ]
      },
      {
        name: 'socket-and-threads-implementation',
        description: 'Implementação de um sistema de diagnóstico médico calculado com base no algoritmo apriori. Clique aqui para maiores detalhes!',
        link: 'https://github.com/lgustavogomdam/socket-and-threads-implementation',
        techs: [
          {name: 'Java'},
          {name: 'Java Swing'},
          {name: 'Multithread'},
          {name: 'Sockets'}
        ]
      },
      {
        name: 'aplicacao-servlet-jsp',
        description: 'Implementação do projeto da locadora usando Java EE  para estudo de caso da faculdade. Clique aqui para maiores detalhes!',
        link: 'https://github.com/lgustavogomdam/aplicacao-servlet-jsp',
        techs: [
          {name: 'Java'},
          {name: 'HTML'},
          {name: 'CSS'},
          {name: 'Typescript'},
          {name: 'Javascript'},
          {name: 'Bootstrap'}
        ]
      },
      {
        name: 'gerenciador-de-estoque',
        description: 'Implementação de um sistema gerenciador de estoque para estudo de caso da faculdade. Clique aqui para maiores detalhes!',
        link: 'https://github.com/lgustavogomdam/Gerenciador-de-Estoque',
        techs: [
          {name: 'Java'},
          {name: 'Java Swing'},
          {name: 'Hibernate'},
          {name: 'PostgreSQL'}
        ]
      }
    ]

    // Items
    this.items = [
      { menu:
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
        },
        clicked: true
      },
      {
        menu:
        {
          label: 'Sobre',
          icon: 'pi pi-user',
        },
        clicked: false
      },
      {
        menu:
        {
          label: 'Experiência',
          icon: 'pi pi-briefcase',
        },
        clicked: false,
      },
      {
        menu:
        {
          label: 'Projetos',
          icon: 'pi pi-bolt',
          url: '#projetos',
        },
        clicked: false,
      }
    ];

    this.items.forEach(elemento=>{
      this.itemsMenu?.push(elemento.menu);
    })

    // Inicializa o texto
    this.textoHome = 'Backend Software Engineer';

    // Inicia um intervalo de 5 segundos para atualizar o texto
    this.subscription = interval(3025).subscribe(() => {
      this.atualizarTexto();
    });
  }

  ngOnDestroy() {
    // Garante que o intervalo é cancelado quando o componente é destruído
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private atualizarTexto() {
    if (this.textoHome === 'Backend Software Engineer') {
      this.textoHome = 'Estudante de Sistemas de Informação';
    } else {
      this.textoHome = 'Backend Software Engineer';
    }
  }
}
