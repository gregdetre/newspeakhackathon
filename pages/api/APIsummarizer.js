import { summarize } from "@/utils/summarizer"

export default async function handler(req, res) {

    try {
        const { input } = await req.body
        console.log('input' + (await input))

        const num_words = (await input).split(" ").length
        if (num_words > 100) {
            const summary = await summarize(input);

            res.status(200).json({ output: summary });
        
        } else {
            res.status(200).json({ output: input});
        }


    } catch (error) {
        console.log(error);
        console.log('error in APIsummarizer')
    }


}
