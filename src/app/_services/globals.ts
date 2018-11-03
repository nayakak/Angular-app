'use strict';

export const API_END_POINT='http://localhost:7800/';
export const HYPERLEDGER_API_END_POINT='http://localhost:3000/';

export const BUYER_GRP_ID = '469b9531-fcbd-bdc2-fe19-ca0c550dfadb';
export const SELLER_GRP_ID = '7ee75d61-dd45-2474-5349-7381321e8c70';
export const AGENT_GRP_ID = 'aa7f03cd-d3ec-0ad0-6d03-0f32416f8844';


export const GRP_ARR = [{
    groupId : BUYER_GRP_ID,
    groupName : 'Buyer',
    slug : 'buyer',
    created_date : new Date().toString()
  },{
    groupId : AGENT_GRP_ID,
    groupName : 'Agent',
    slug : 'agent',
    created_date : new Date().toString()
  },{
    groupId : SELLER_GRP_ID,
    groupName : 'Seller',
    slug : 'seller',
    created_date : new Date().toString()
  }];

  

