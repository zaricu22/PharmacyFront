import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective, NgChartsModule} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {IProduct} from "../../../core/models/iproduct";
import {forkJoin, Subscription} from "rxjs";
import {ManufacturerService} from "../../../core/services/manufacturer.service";
import {ProductService} from "../../../product/services/product.service";
import {ProductNumberDTO} from "../../../core/dto/product-number-dto";

@Component({
  standalone: true,
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  imports: [
    NgChartsModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class StatisticsComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  manufacturerService: ManufacturerService;
  productService: ProductService;

  numOfProductsByManus: Array<ProductNumberDTO> = new Array<ProductNumberDTO>;
  topFiveProdByPrice: Array<IProduct> = new Array<IProduct>();
  leastFiveProdByPrice: Array<IProduct> = new Array<IProduct>();

  subscription$: Subscription = new Subscription;

  constructor(manufacturerService: ManufacturerService, productService: ProductService) {
    this.manufacturerService = manufacturerService;
    this.productService = productService;
  }

  ngOnInit() {

    this.subscription$.add(
      forkJoin([
        this.productService.getFiveProdOrderByPrice('top-five'),
        this.productService.getFiveProdOrderByPrice('least-five'),
        this.manufacturerService.countProductsByManus()
      ]) //we can use more that 2 api request
      .subscribe(
        (result) => {
          //this will return list of array of the result
          this.topFiveProdByPrice = result[0] as Array<IProduct>;
          this.leastFiveProdByPrice = result[1] as Array<IProduct>;
          this.numOfProductsByManus = result[2] as Array<ProductNumberDTO>;

          this.barChartData = {
            labels: ['Top', 'Least'],
            datasets: [
              { data: [this.topFiveProdByPrice[0].price, 0], label: this.topFiveProdByPrice[0].name},
              { data: [this.topFiveProdByPrice[1].price, 0], label: this.topFiveProdByPrice[1].name},
              { data: [this.topFiveProdByPrice[2].price, 0], label: this.topFiveProdByPrice[2].name},
              { data: [this.topFiveProdByPrice[3].price, 0], label: this.topFiveProdByPrice[3].name},
              { data: [this.topFiveProdByPrice[4].price, 0], label: this.topFiveProdByPrice[4].name},
              { data: [0, this.leastFiveProdByPrice[0].price], label: this.leastFiveProdByPrice[0].name},
              { data: [0, this.leastFiveProdByPrice[1].price], label: this.leastFiveProdByPrice[1].name},
              { data: [0, this.leastFiveProdByPrice[2].price], label: this.leastFiveProdByPrice[2].name},
              { data: [0, this.leastFiveProdByPrice[3].price], label: this.leastFiveProdByPrice[3].name},
              { data: [0, this.leastFiveProdByPrice[4].price], label: this.leastFiveProdByPrice[4].name},
            ],
          };

          let newPieChartData: ChartData<'pie', number[], string | string[]> =
            { labels: [], datasets: [ {data: [] } ] };
          this.numOfProductsByManus.forEach((item) => {
            (newPieChartData.labels as String[]).push(item.name);
            newPieChartData.datasets[0].data.push(item.count);
            this.pieChartData = newPieChartData;
          });
        }
      )
    );

  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  public barChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> =
    { labels: [], datasets: [ {data: [] } ] };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DataLabelsPlugin];

  // events
  public chartClicked({
                        event,
                        active,
                      }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
                        event,
                        active,
                      }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }
}
