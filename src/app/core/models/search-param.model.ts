export class SearchParamModel {
  fieldName: string;
  joinType: string;
  searchString: string;

  constructor(fieldName: string, joinType: string, searchString: string) {
    this.fieldName = fieldName;
    this.joinType = joinType;
    this.searchString = searchString;
  }
}
