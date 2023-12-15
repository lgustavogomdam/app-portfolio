import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToolbarModule } from 'primeng/toolbar';

import { SharedModule } from '../../shared/shared.module';
import { MenuItem } from '../../models/menu-item';
import { Repository } from '../../models/repository';
import { Subscription, interval } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';

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
    CardModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  //Readonly
  textoHome: string = 'BackEnd Software Engineer';
  mostrarImagem: boolean = false;
  items!: MenuItem[];
  repositories!: Repository[];

  //IoC
  private subscription!: Subscription;

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Obtém a posição vertical da página ao rolar
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Define se a imagem deve ser mostrada com base na posição de rolagem
    this.mostrarImagem = scrollPosition >= window.innerHeight - 100;
  }

  mudarLink(indexElement: any) {
    this.items.forEach((elemento, index) => {
      if (index == indexElement) {
        elemento.clicked = true;
      } else {
        elemento.clicked = false;
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
      { label: 'Home', icon: 'pi pi-fw pi-home', link: '#home', clicked: true },
      { label: 'Sobre', icon: 'pi pi-user', link: '#sobre', clicked: false },
      {
        label: 'Experiência',
        icon: 'pi pi-briefcase',
        link: '#experiencia',
        clicked: false,
      },
      {
        label: 'Projetos',
        icon: 'pi pi-bolt',
        link: '#projetos',
        clicked: false,
      }
    ];

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
