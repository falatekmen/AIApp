import { Configuration, OpenAIApi } from "openai"


const configuration = new Configuration({
    apiKey: "",
});

const openai = new OpenAIApi(configuration);

export const getCompletion = async (text) => {
    try {
        return await openai.createCompletion({
            model: "text-davinci-003",
            // prompt: "\"\"\"\nUtil exposes the following:\nutil.openai() -> authenticates & returns the openai module, which has the following functions:\nopenai.Completion.create(\n    prompt=\"<my prompt>\", # The prompt to start completing from\n    max_tokens=123, # The max number of tokens to generate\n    temperature=1.0 # A measure of randomness\n    echo=True, # Whether to return the prompt in addition to the generated completion\n)\n\"\"\"\nimport util\n\"\"\"\nCreate an OpenAI completion starting from the prompt \"Once upon an AI\", no more than 5 tokens. Does not include the prompt.\n\"\"\"\n",
            prompt: text,
            // prompt:"Convert movie titles into emoji.\n\nBack to the Future: 👨👴🚗🕒 \nBatman: 🤵🦇 \nTransformers: 🚗🤖 \nStar Wars:",
            // prompt: "Bunu bana özetle:\nGitHub sürecine bakarsak açılışının ilk yılında 1002 contributor 124 yeni sürümle 45 branch’te 7,971 kere commitlemiş. Türkçe’si; 1002 geliştirici 45 versiyonda ki 124 yeni sürüm ile 7,971 kere yeni geliştirmeler gerçekleştirmiş. Bu verilerin açıklaması yazılım dünyasına merhaba demiş bir framework için oldukça iyi bir sonuç demek ve arkasında ki Facebook desteği ile açık kaynaklı bir framework oluşu sayesinde geliştiricilerin kısa zamanda sevgisini kazanmasına sebep olmuş. Ayrıca performans testlerinde Java ve Objective-C dillerinden de geri kalmadığını göstermiş bu framework. Sonuçta biz geliştiriciler için en önemli noktalardan biri performans ve verimdir.",
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["\"\"\""],
        }).then((response) => {
            // console.log(response.data.choices[0].text.trim())
            return response.data.choices[0].text.trim()
        })

    } catch (error) {
        console.log(error) //XNOTE analyticse bu erroru gönder
        return "Sistemimde bir hata oluştu. Şu an sana yanıt veremiyorum"
    }

}