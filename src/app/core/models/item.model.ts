import {AuthorModel} from './author.model';
import {ConfirmationModel} from './confirmation.model';

export interface ItemModel {
  id: number;
  category: string;
  author: AuthorModel;
  confirmation: ConfirmationModel;
  title: string;
  description: string;
  period: string;
  edition: string;
  publisher: string;
  dateOfPublication: string;
  placeOfPublication: string;
  shortTitle: string;
  sourceTitle: string;
  url: string;
  dateOfAccess: string;
  journalName: string;
  DOI: string;
  journalVolume: number;
  journalIssue: number;
  journalPageRange: string;
  journalAbbr: string;
  language: string;
  isPublicDomain: boolean;
  pageRange: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  simple: boolean;
}

