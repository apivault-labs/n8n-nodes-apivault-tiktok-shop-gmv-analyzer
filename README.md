# n8n-nodes-apivault-tiktok-shop-gmv-analyzer

An [n8n](https://n8n.io) community node for **TikTok Shop GMV Analyzer**, powered by the [`apivault_labs/tiktok-shop-seller-product-creator-gmv-analyzer` Apify Actor](https://apify.com/apivault_labs/tiktok-shop-seller-product-creator-gmv-analyzer).

Analyze TikTok Shop sellers, products, niches, and affiliate creators. Estimate GMV, profit, portfolio concentration, creator contribution, and product opportunities from public marketplace signals. No login or cookies. Pay per result from $5/1K.

The node is a thin connector: collection, analysis, retries and billing run in the hosted Actor. It contains no private scraper implementation or embedded credentials.

## Installation

1. Open **Settings → Community Nodes** in your n8n instance.
2. Select **Install**.
3. Enter `n8n-nodes-apivault-tiktok-shop-gmv-analyzer` and confirm.

## Credentials

Create an **Apify API** credential in n8n and paste your personal token from [Apify Console → Integrations](https://console.apify.com/account/integrations). The token is sent to Apify as a bearer credential and is never bundled with this package.

## Usage

Add **TikTok Shop GMV Analyzer** to a workflow, fill the public Actor inputs below, and execute the node. Every Dataset result becomes one n8n item, so it can flow into Sheets, databases, CRMs, alerts or your own code. The node respects n8n's **Continue On Fail** behavior.

| Input | Type | Description |
|---|---|---|
| `mode` | `string` | Choose whether to research product keywords, seller portfolios, individual products, or creator contribution. |
| `searchQueries` | `array` | Keywords used in Keyword mode and to discover public creator-product relationships in Creator mode. |
| `sellerUrls` | `array` | Public TikTok Shop store URLs or numeric seller IDs used in Seller mode. |
| `productUrls` | `array` | Public TikTok Shop PDP links used in Product mode. |
| `productIds` | `array` | Numeric product IDs used in Product mode. |
| `creatorIds` | `array` | In Creator mode, return only matching public creator IDs or names. Leave empty to rank every creator discovered for the supplied keywords. |
| `maxItems` | `integer` | Hard limit for unique products scanned or returned. Set this before a large run to control cost. |
| `maxConcurrency` | `integer` | Parallel product processing. The default balances speed and reliability. |
| `timeoutSeconds` | `integer` | Maximum time allowed for one public page request. |
| `costOfGoodsPercent` | `number` | Your estimated sourcing cost as a percentage of sale price. |
| `platformFeePercent` | `number` | Assumed TikTok Shop marketplace and transaction fees. |
| `creatorCommissionPercent` | `number` | Assumed affiliate creator commission per attributed order. |
| `advertisingPercent` | `number` | Estimated paid-media cost as a percentage of product revenue. |
| `refundRatePercent` | `number` | Estimated returns and refunds allowance. |
| `shippingCostPerOrder` | `number` | Seller-paid fulfillment and shipping cost per unit in USD. |

## Pricing

The package is free. Actor runs are billed by Apify using the pricing shown on the [Actor page](https://apify.com/apivault_labs/tiktok-shop-seller-product-creator-gmv-analyzer); platform usage may also apply.

## Resources

- [Actor and live input schema](https://apify.com/apivault_labs/tiktok-shop-seller-product-creator-gmv-analyzer)
- [Source repository](https://github.com/apivault-labs/n8n-nodes-apivault-tiktok-shop-gmv-analyzer)
- [n8n community-node documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

MIT. The hosted Actor is a separate paid service governed by Apify terms.
