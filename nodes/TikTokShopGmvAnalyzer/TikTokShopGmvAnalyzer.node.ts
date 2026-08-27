import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
	IRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

const ACTOR_ID = 'apivault_labs~tiktok-shop-seller-product-creator-gmv-analyzer';

export class TikTokShopGmvAnalyzer implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'TikTok Shop GMV Analyzer',
		name: 'tiktokShopGmvAnalyzer',
		icon: 'file:tiktokshopgmvanalyzer.svg',
		group: ['transform'],
		version: 1,
		description: 'Analyze TikTok Shop sellers, products, niches, and affiliate creators. Estimate GMV, profit, portfolio concentration, creator contribution, and product opportunities from public marketplace signals. No login or cookies. Pay per result from $5/1K.',
		defaults: { name: 'TikTok Shop GMV Analyzer' },
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [{ name: 'apifyApi', required: true }],
		properties: [
   {
      "displayName": "Analysis mode",
      "name": "mode",
      "description": "Choose whether to research product keywords, seller portfolios, individual products, or creator contribution.",
      "type": "options",
      "options": [
         {
            "name": "Keyword & product opportunities",
            "value": "keyword"
         },
         {
            "name": "Seller portfolio GMV",
            "value": "seller"
         },
         {
            "name": "Individual product GMV",
            "value": "product"
         },
         {
            "name": "Creator contribution ranking",
            "value": "creator"
         }
      ],
      "default": "keyword"
   },
   {
      "displayName": "Product keywords",
      "name": "searchQueries",
      "description": "Keywords used in Keyword mode and to discover public creator-product relationships in Creator mode. (comma or new-line separated)",
      "type": "string",
      "default": ""
   },
   {
      "displayName": "TikTok Shop seller URLs or IDs",
      "name": "sellerUrls",
      "description": "Public TikTok Shop store URLs or numeric seller IDs used in Seller mode. (comma or new-line separated)",
      "type": "string",
      "default": ""
   },
   {
      "displayName": "TikTok Shop product URLs",
      "name": "productUrls",
      "description": "Public TikTok Shop PDP links used in Product mode. (comma or new-line separated)",
      "type": "string",
      "default": ""
   },
   {
      "displayName": "TikTok Shop product IDs",
      "name": "productIds",
      "description": "Numeric product IDs used in Product mode. (comma or new-line separated)",
      "type": "string",
      "default": ""
   },
   {
      "displayName": "Creator IDs or names (optional)",
      "name": "creatorIds",
      "description": "In Creator mode, return only matching public creator IDs or names. Leave empty to rank every creator discovered for the supplied keywords. (comma or new-line separated)",
      "type": "string",
      "default": ""
   },
   {
      "displayName": "Maximum results",
      "name": "maxItems",
      "description": "Hard limit for unique products scanned or returned. Set this before a large run to control cost.",
      "type": "number",
      "default": 30,
      "typeOptions": {
         "minValue": 1,
         "maxValue": 100
      }
   },
   {
      "displayName": "Processing concurrency",
      "name": "maxConcurrency",
      "description": "Parallel product processing. The default balances speed and reliability.",
      "type": "number",
      "default": 4,
      "typeOptions": {
         "minValue": 1,
         "maxValue": 8
      }
   },
   {
      "displayName": "Request timeout",
      "name": "timeoutSeconds",
      "description": "Maximum time allowed for one public page request.",
      "type": "number",
      "default": 35,
      "typeOptions": {
         "minValue": 15,
         "maxValue": 50
      }
   },
   {
      "displayName": "Cost of goods, %",
      "name": "costOfGoodsPercent",
      "description": "Your estimated sourcing cost as a percentage of sale price.",
      "type": "number",
      "default": 30,
      "typeOptions": {
         "minValue": 0,
         "maxValue": 100
      }
   },
   {
      "displayName": "Marketplace fees, %",
      "name": "platformFeePercent",
      "description": "Assumed TikTok Shop marketplace and transaction fees.",
      "type": "number",
      "default": 6,
      "typeOptions": {
         "minValue": 0,
         "maxValue": 100
      }
   },
   {
      "displayName": "Creator commission, %",
      "name": "creatorCommissionPercent",
      "description": "Assumed affiliate creator commission per attributed order.",
      "type": "number",
      "default": 10,
      "typeOptions": {
         "minValue": 0,
         "maxValue": 100
      }
   },
   {
      "displayName": "Advertising cost, %",
      "name": "advertisingPercent",
      "description": "Estimated paid-media cost as a percentage of product revenue.",
      "type": "number",
      "default": 10,
      "typeOptions": {
         "minValue": 0,
         "maxValue": 100
      }
   },
   {
      "displayName": "Refund allowance, %",
      "name": "refundRatePercent",
      "description": "Estimated returns and refunds allowance.",
      "type": "number",
      "default": 2,
      "typeOptions": {
         "minValue": 0,
         "maxValue": 100
      }
   },
   {
      "displayName": "Shipping cost per order",
      "name": "shippingCostPerOrder",
      "description": "Seller-paid fulfillment and shipping cost per unit in USD.",
      "type": "number",
      "default": 0,
      "typeOptions": {
         "minValue": 0
      }
   }
],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		for (let i = 0; i < items.length; i++) {
			try {
				const body: Record<string, unknown> = {};
				body["mode"] = this.getNodeParameter("mode", i);
				{ const _v = this.getNodeParameter("searchQueries", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["searchQueries"] = _a; }
				{ const _v = this.getNodeParameter("sellerUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["sellerUrls"] = _a; }
				{ const _v = this.getNodeParameter("productUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["productUrls"] = _a; }
				{ const _v = this.getNodeParameter("productIds", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["productIds"] = _a; }
				{ const _v = this.getNodeParameter("creatorIds", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["creatorIds"] = _a; }
				body["maxItems"] = this.getNodeParameter("maxItems", i);
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
				body["timeoutSeconds"] = this.getNodeParameter("timeoutSeconds", i);
				body["costOfGoodsPercent"] = this.getNodeParameter("costOfGoodsPercent", i);
				body["platformFeePercent"] = this.getNodeParameter("platformFeePercent", i);
				body["creatorCommissionPercent"] = this.getNodeParameter("creatorCommissionPercent", i);
				body["advertisingPercent"] = this.getNodeParameter("advertisingPercent", i);
				body["refundRatePercent"] = this.getNodeParameter("refundRatePercent", i);
				body["shippingCostPerOrder"] = this.getNodeParameter("shippingCostPerOrder", i);
				const options: IRequestOptions = {
					method: 'POST' as IHttpRequestMethods,
					url: `https://api.apify.com/v2/acts/${ACTOR_ID}/run-sync-get-dataset-items`,
					body,
					json: true,
				};
				const response = await this.helpers.requestWithAuthentication.call(this, 'apifyApi', options);
				const results = Array.isArray(response) ? response : [response];
				for (const result of results) returnData.push({ json: result, pairedItem: { item: i } });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
			}
		}
		return [returnData];
	}
}
