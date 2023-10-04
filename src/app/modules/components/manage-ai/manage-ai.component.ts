import {
  ApplicationRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  createComponent,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/general';
import { AiResponseParserComponent } from '../ai-response-parser/ai-response-parser.component';

@Component({
  selector: 'app-manage-ai',
  templateUrl: './manage-ai.component.html',
  styleUrls: ['./manage-ai.component.scss'],
})
export class ManageAiComponent {
  @ViewChild('aiContainer') aiContainer!: ElementRef;
  @Input() public user!: User;

  public operationHeight: string;
  public form: FormGroup;
  public aiResponse =
    'The percentage of efforts spent by each team is: AutoJoin (0.26%), Core Services (18.60%), Datalake (0.09%), Devops (4.63%), EasyCLA (3.79%), Individual Dashboard (16.72%), Insights (17.18%), Organization Dashboard (23.58%), Others (4.94%), PCC (6.33%), and TC (3.88%).';

  private fb: FormBuilder = inject(FormBuilder);

  constructor(private appRef: ApplicationRef) {
    this.operationHeight = window.innerHeight - 290 + 'px';
    this.form = this.fb.group({
      searchText: ['', [Validators.required]],
    });
  }

  public onSend(): void {
    const componentRef = createComponent(AiResponseParserComponent, {
      environmentInjector: this.appRef.injector,
    });
    this.appRef.attachView(componentRef.hostView);
    componentRef.instance.question = this.form.controls['searchText'].value;
    componentRef.instance.response = this.aiResponse;

    this.aiContainer.nativeElement.append(
      (<any>componentRef.hostView).rootNodes[0]
    );
    this.form.reset();
    this.resetScroll();
  }

  resetScroll(): void {
    this.aiContainer.nativeElement.scrollTop =
      this.aiContainer.nativeElement.scrollHeight;
  }
}
