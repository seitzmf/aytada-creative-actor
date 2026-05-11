# AYTADA Creative Intelligence Actor

Generate high-converting, strategically-aligned ad concepts and scripts based on **Eugene Schwartz's Five Stages of Awareness** and **Robert Cialdini's Persuasion Triggers**.

This actor connects directly to the **AYTADA Creative Engine** to provide bulk strategic brainstorming for agencies, marketers, and enterprises.

## 🚀 Key Features

- **Awareness-Aware Generation**: Tailors every ad concept to where your customer is in their journey (Unaware, Problem Aware, etc.).
- **Chain-of-Thought Reasoning**: Every response includes the AI's internal psychological analysis of the hook and narrative.
- **Bulk Processing**: Input your product details and receive multiple high-fidelity ad concepts in seconds.
- **Visual & Sonic Directives**: Provides metadata for scene generation and background music styles.

## 🛠️ How to Use

1. **Get your API Key**: Log in to [AYTADA](https://aytada.app) and generate a public API key from your settings.
2. **Configure the Actor**:
   - `apiKey`: Your `sb_live_...` key.
   - `productName`: The name of your product.
   - `productDescription`: A detailed description of the product and its benefits.
   - `awarenessStage`: Select the target awareness stage.
   - `adType`: Choose between Video, Banner, Jingle, or Flyer.
3. **Run the Actor**: The results will be pushed to your Apify Dataset, ready for export to JSON, CSV, or Excel.

## 📊 Output Examples

The actor returns structured JSON for each idea:
- `title`: The campaign name.
- `reasoning`: The "why" behind the creative choice.
- `hook`: The opening attention-grabber.
- `narrative`: The emotional arc of the ad.
- `visuals`: Instructions for focal points and layouts.
- `sonic`: Vibe and prompt for background audio.

## ⚖️ Credits

Using this actor consumes AYTADA credits. Ensure your account has sufficient credits for the number of generations you plan to run.

---

Built by [AYTADA](https://aytada.app) - The AI Production House for High-Performance Ads.
