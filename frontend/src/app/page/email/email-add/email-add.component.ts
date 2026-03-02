import { Component } from '@angular/core';

@Component({
  selector: 'app-email-add',
  templateUrl: './email-add.component.html',
  styleUrls: ['./email-add.component.css']
})
export class EmailAddComponent {

  public quillStyle = {
    'width': '100%',
    'min-height': '200px',
    'display': 'block',
    'background': "#fff"
  }
  public quillConfig = {
  toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // basic formatting
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // header dropdown
      [{ 'color': [] }, { 'background': [] }], // color options
      ['link', 'image', 'video'], // embeds
      ['clean'] // remove formatting button
    ]
  };

}
