interface PoemModel extends ItemModel {
  form: string;
  confirmation: ConfirmationModel;
  text: string[];
  annotation: AnnotationModel;
  hidden: boolean;
  testing: boolean;
  authorId: number;
}
