interface PoemModel extends ItemModel {
  form: string;
  confirmation: ConfirmationModel;
  text: any;
  annotation: AnnotationModel;
  hidden: boolean;
  testing: boolean;
  authorId: number;
}
