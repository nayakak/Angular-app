import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.kindlebit.com{
   export class LandTitle extends Asset {
      titleId: string;
      owner: Person;
      reservePrice: number;
      information: string;
      state: ListingState;
      forSale: boolean;
      offers: Offer[];
   }
   export enum ListingState {
      FOR_SALE,
      RESERVE_NOT_MET,
      SOLD,
   }
   export class SalesAgreement extends Asset {
      salesId: string;
      buyer: Person;
      seller: Person;
      title: LandTitle;
   }
   export class UserGroup extends Asset {
      groupId: string;
      groupName: string;
   }
   export class Person extends Participant {
      personId: string;
      firstName: string;
      lastName: string;
      group: UserGroup;
   }
   export class RegisterPropertyForSale extends Transaction {
      seller: Person;
      title: LandTitle;
   }
   export class Offer extends Transaction {
      bidPrice: number;
      listing: LandTitle;
      person: Person;
   }
// }
