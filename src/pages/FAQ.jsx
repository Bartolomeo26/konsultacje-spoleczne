import Accordion from "../components/Accordion";
function FAQ()
{

    return (
        <>

            <div className="w-3/4 bg-gray-200 rounded-lg mt-10 p-5 mb-10">
                <h1 className="text-3xl text-center mb-5">FAQ - Frequently Asked Questions</h1>
                <Accordion
                    title="What are social consultations?"
                    answer="Social consultations are discussions or meetings designed to gather feedback, opinions, and insights from community members regarding social issues, policies, or programs. They aim to ensure that the voices of the public are heard and considered in decision-making processes."
                />
                <Accordion
                    title="Who can participate in social consultations?"
                    answer="Anyone can participate in social consultations! We encourage individuals from all backgrounds, including community members, stakeholders, and organizations, to share their thoughts and contribute to the discussions."
                />
                <Accordion title="How can I get involved in consultations?" answer="You can get involved by signing up on our website to receive notifications about upcoming consultations. Additionally, you can participate in our online discussions, surveys, or workshops." />
                <Accordion
                    title="What topics are covered in social consultations?"
                    answer="We cover a wide range of topics, including community development, public health, education, environmental issues, and more. The specific topics for each consultation will be announced in advance."
                />
                <Accordion
                    title="How is feedback from consultations used?"
                    answer="Feedback gathered during consultations is compiled and analyzed to inform policymakers and stakeholders. This input helps shape programs and initiatives that address the needs and concerns of the community."
                />
                <Accordion title="Will my participation remain confidential?" answer="Yes, your participation can remain confidential. We value your privacy and ensure that personal information is protected. Any data collected will be used solely for consultation purposes." />
                <Accordion title="What if I have additional questions?" answer="If you have more questions, feel free to reach out to us via our contact form or email. We’re here to help!" />
            </div>
        </>
    )
}

export default FAQ;