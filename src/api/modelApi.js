import { Configuration, OpenAIApi } from "openai"


export const getCompletion = async (
    text,
    key,
    temperature,
    model,
    max_token,
    stop,
    is_online,
    custom_error_message,
    generalErrorMessage
) => {

    const configuration = new Configuration({
        // remote configten gelen is_online false ise, istek atarken hata vermesi için
        apiKey: is_online ? key : "xxx",
    });

    const openai = new OpenAIApi(configuration);

    // console.log({ text, key, temperature, model, max_token, stop })
    try {
        return await openai.createCompletion({
            // https://beta.openai.com/docs/quickstart/adjust-your-settings
            model: model,
            prompt: text,
            // Sıcaklığın düşürülmesi, daha az risk alacağı ve tamamlamaların daha doğru
            // ve belirleyici olacağı anlamına gelir. Artan sıcaklık, daha çeşitli tamamlamalara neden olacaktır.
            temperature: temperature ? temperature : 0,
            max_tokens: max_token ? max_token : 64,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: stop ? stop : null // eğer ["."] ise, verdiği cevapta ilk nokta işaretinde cevabı keser
        }).then((response) => {
            // console.log(response.data.choices[0].text.trim())
            return response.data.choices[0].text.trim()
        })

    } catch (error) {
        console.log(error) //XNOTE analyticse bu erroru gönder
        // modelin is_online değeri false olduğunda gösterilecek hata mesajı ayrı
        // genel problemden kaynaklı gösterilecek hata mesajı ayrıdır
        return is_online ? generalErrorMessage : custom_error_message
    }

}