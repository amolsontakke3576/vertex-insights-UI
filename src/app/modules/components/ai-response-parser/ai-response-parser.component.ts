import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-ai-response-parser',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './ai-response-parser.component.html',
  styleUrls: ['./ai-response-parser.component.scss'],
})
export class AiResponseParserComponent implements AfterViewInit {
  @Input() question: string = '';
  @Input() response: string = '';
  @ViewChild('writingPad') writingPad!: ElementRef;
  
  public chartLabel: string[] = [];
  public chartValue: number[] = [];
  public hasShowChatOptions: boolean = false;
  public hasWritingDone: boolean = false;
  public selectedChart: string = '';
  public pieData: any;
  public pieOptions: any;
  public barData: any;
  public barOptions: any;

  private startIndex: number = 0;
  private speed: number = 20;
  private documentStyle: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.extractDataFromResponse();
    this.typeWriter();
    this.documentStyle = getComputedStyle(document.documentElement);
  }

  public typeWriter(): void {
    if (this.startIndex < this.response.length) {
      this.writingPad.nativeElement.innerHTML += this.response.charAt(
        this.startIndex
      );
      this.startIndex = this.startIndex + 1;
      setTimeout(() => {
        this.typeWriter();
      }, this.speed);
    } else {
      this.hasWritingDone = true;
    }
  }

  public onClickPieChart(): void {
    this.pieData = {
      labels: this.chartLabel,
      datasets: [
        {
          data: this.chartValue,
          backgroundColor: [
            this.documentStyle.getPropertyValue('--blue-500'),
            this.documentStyle.getPropertyValue('--yellow-500'),
            this.documentStyle.getPropertyValue('--green-500'),
            this.documentStyle.getPropertyValue('--red-500'),
            this.documentStyle.getPropertyValue('--orange-200'),
            this.documentStyle.getPropertyValue('--purple-400'),
            this.documentStyle.getPropertyValue('--pink-400'),
          ],
          hoverBackgroundColor: [
            this.documentStyle.getPropertyValue('--blue-400'),
            this.documentStyle.getPropertyValue('--yellow-400'),
            this.documentStyle.getPropertyValue('--green-400'),
            this.documentStyle.getPropertyValue('--red-500'),
            this.documentStyle.getPropertyValue('--orange-500'),
            this.documentStyle.getPropertyValue('--purple-500'),
            this.documentStyle.getPropertyValue('--pink-400'),
          ],
        },
      ],
    };
    this.selectedChart = 'pie';
  }

  public onClickBarChart(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barData = {
      labels: this.chartLabel,
      datasets: [
        {
          backgroundColor: this.documentStyle.getPropertyValue('--blue-500'),
          borderColor: this.documentStyle.getPropertyValue('--blue-500'),
          data: this.chartValue,
        },
      ],
    };

    this.barOptions = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    this.selectedChart = 'bar';
  }

  private extractDataFromResponse() {
    const regexPattern = /(\w+) \(\d+\.\d+?\W+\)/g;
    const arr = this.response.match(regexPattern) || [];
    console.log(arr);
    arr.forEach((text) => {
      const chartData = text.split(' (');
      this.chartLabel.push(chartData[0] || '-');
      const value = chartData[1].replace(')', '');
      this.chartValue.push(parseFloat(value));
    });
    this.hasShowChatOptions = arr.length > 0 ? true : false;
  }
}
