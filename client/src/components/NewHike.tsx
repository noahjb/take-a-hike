import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useHistory } from 'react-router-dom';

interface IHike {
    title: string;
    description: string;
}

function NewHike() {
    const history = useHistory();

    return (
        <div>
            <h2>Create new hike</h2>
            <Formik
                initialValues={{
                    title: '',
                    description: ''
                }}
                onSubmit={(
                    newHike: IHike,
                    { setSubmitting }: FormikHelpers<IHike>
                ) => {
                    setTimeout(() => {
                        alert(JSON.stringify(newHike, null, 2));
                        setSubmitting(false);
                        history.push('/');
                    }, 500);
                }}
            >
                <Form>
                    <label htmlFor="title">Title</label>
                    <Field id="title" name="title" />

                    <label htmlFor="description">Description</label>
                    <Field id="description" name="description" type="textarea" />

                    <button type="submit">Create</button>
                </Form>
            </Formik>
        </div>
    );
}

export default NewHike;
