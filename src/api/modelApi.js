import { Configuration, OpenAIApi } from "openai"


export const getCompletion = async (text, key, temperature, model) => {

    const configuration = new Configuration({
        apiKey: key,
    });

    const openai = new OpenAIApi(configuration);
    
    try {
        return await openai.createCompletion({
            // https://beta.openai.com/docs/quickstart/adjust-your-settings
            model: model,
            prompt: text,
            // temelde modelin bu tahminleri yaparken ne kadar güvenli olması gerektiğini kontrol etmenizi sağlayan 
            // 0 ile 1 arasında bir değerdir. Sıcaklığın düşürülmesi, daha az risk alacağı ve tamamlamaların daha doğru
            // ve belirleyici olacağı anlamına gelir. Artan sıcaklık, daha çeşitli tamamlamalara neden olacaktır.
            temperature: temperature,
            max_tokens: 64,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        }).then((response) => {
            // console.log(response.data.choices[0].text.trim())
            return response.data.choices[0].text.trim()
        })

    } catch (error) {
        console.log(error) //XNOTE analyticse bu erroru gönder
        return "Sistemimde bir hata oluştu. Şu an sana yanıt veremiyorum"
    }

}