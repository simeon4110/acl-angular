export class ConfirmationDto {
  itemId: number;
  itemType: string;
  isConfirmed: boolean;
  message: string;

  constructor(itemId: number, itemType: string, isConfirmed: boolean, message: string) {
    this.itemId = itemId;
    this.itemType = itemType;
    this.isConfirmed = isConfirmed;
    this.message = message;
  }
}
