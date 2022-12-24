import InAppReview from 'react-native-in-app-review'
import { setIsReviewed } from '../redux/isReviewedRedux'


const ReviewRequest = (dispatch) => {

    //cihazın sürümü uygulamayı derecelendirmek için destekleniyormu
    const isAvailable = InAppReview.isAvailable()

    if (isAvailable) {
        // trigger UI InAppreview
        InAppReview.RequestInAppReview()
            .then((hasFlowFinishedSuccessfully) => {
                if (hasFlowFinishedSuccessfully) {
                    console.log("setledi")
                    dispatch(setIsReviewed(true))
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default ReviewRequest