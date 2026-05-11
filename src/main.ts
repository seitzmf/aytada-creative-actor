import { Actor } from 'apify';
import fetch from 'node-fetch';

/**
 * AYTADA Creative Intelligence Actor
 * This actor interacts with the AYTADA public API to generate 
 * strategic creative assets in bulk.
 */

await Actor.init();

interface Input {
    apiKey: string;
    productName: string;
    productDescription: string;
    awarenessStage: string;
    adType: string;
    industry?: string;
}

const input = await Actor.getInput<Input>();

if (!input) {
    throw new Error('No input provided! Please check the input tab in your Apify actor configuration.');
}

const { apiKey, productName, productDescription, awarenessStage, adType, industry = 'general' } = input;

if (!apiKey) {
    throw new Error('API Key is required! Please provide your AYTADA API key.');
}

console.log(`🚀 Starting generation for: "${productName}"`);
console.log(`📍 Awareness Stage: ${awarenessStage}`);
console.log(`🎨 Ad Type: ${adType}`);

try {
    const API_URL = 'https://aytada.app/api/v1/creative/ideas';
    
    console.log('📡 Communicating with AYTADA Creative Engine...');
    
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-AYTADA-API-KEY': apiKey,
        },
        body: JSON.stringify({
            product: {
                name: productName,
                description: productDescription
            },
            avatar: {
                awareness_stage: awarenessStage
            },
            config: {
                adType,
                industry
            }
        }),
    });

    if (!response.ok) {
        const errorData = await response.json() as any;
        const msg = errorData.message || errorData.error || 'Unknown API error';
        
        if (response.status === 401) {
            throw new Error(`Authentication Failed: ${msg}. Please check if your API key is correct and active.`);
        }
        if (response.status === 402) {
            throw new Error(`Insufficient Credits: ${msg}. Please top up your credits in the AYTADA dashboard.`);
        }
        
        throw new Error(`AYTADA API Error (${response.status}): ${msg}`);
    }

    const result = await response.json() as any;
    
    if (result.status === 'success' && result.data?.ideas) {
        console.log(`✅ Successfully generated ${result.data.ideas.length} ad concepts.`);
        
        // Push each idea to the Apify dataset
        for (const idea of result.data.ideas) {
            await Actor.pushData({
                productName,
                awarenessStage,
                adType,
                ...idea,
                generatedAt: new Date().toISOString()
            });
        }
        
        console.log('📊 Results have been pushed to the dataset.');
    } else {
        throw new Error('The API returned an unexpected response format.');
    }

} catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during generation';
    console.error(`❌ Generation failed: ${errorMessage}`);
    await Actor.fail(errorMessage);
}

await Actor.exit();
