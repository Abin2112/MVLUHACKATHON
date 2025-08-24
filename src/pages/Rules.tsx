import React from 'react';
import { Users, Target, Clock, Award, FileText, CheckCircle, Star, Lightbulb } from 'lucide-react';

const Rules = () => {
  const sections = [
    {
      title: "Who Can Join",
      icon: <Users className="h-6 w-6" />,
      content: [
        "Only students from the college can participate",
        "Teams must have exactly 6 members",
        "At least one female member is mandatory in each team",
        "Members cannot be from different colleges",
        "Teams can choose between Software (coding/app development) and Hardware (physical prototypes) tracks"
      ]
    },
    {
      title: "Making Your Team",
      icon: <Target className="h-6 w-6" />,
      content: [
        "Teams must pick a unique team name (college name not allowed)",
        "Decide a team leader who will be the main point of contact",
        "Submit member details: name, gender, email, and phone number for all 6 members",
        "Each team can select only one problem statement",
        "Team registration must be completed before the deadline"
      ]
    },
    {
      title: "Event Details",
      icon: <Clock className="h-6 w-6" />,
      content: [
        "The hackathon will be conducted offline at the college campus",
        "Duration: Approximately 12 hours of continuous coding/development",
        "College will provide: Internet connectivity, power supply, and workspace",
        "Participants must bring: Laptops, chargers, and any special equipment needed",
        "Accommodation will be provided during the event"
      ]
    },
    {
      title: "Judging Criteria",
      icon: <Award className="h-6 w-6" />,
      content: [
        "Creativity and Innovation: Uniqueness and originality of the solution",
        "Practicality: How realistic and implementable is the solution",
        "Impact: Potential to solve real-world problems",
        "User Experience: Design and usability of the solution",
        "Future Scope: Scalability and potential for further development",
        "Presentation Quality: Clear communication of ideas and technical implementation"
      ]
    },
    {
      title: "Rules During the Hackathon",
      icon: <CheckCircle className="h-6 w-6" />,
      content: [
        "All work must be done during the hackathon period only",
        "No plagiarism or copying from existing solutions",
        "Respect all deadlines for submissions and presentations",
        "Follow all college rules and maintain discipline",
        "No team member changes allowed after registration closes",
        "Use of external APIs and libraries is allowed but must be mentioned"
      ]
    },
    {
      title: "What to Submit",
      icon: <FileText className="h-6 w-6" />,
      content: [
        "Chosen problem statement(s) that your team is solving",
        "Initial PPT explaining your idea and approach (submitted before hackathon)",
        "Project title and detailed description",
        "Working prototype or demo of your solution",
        "Complete source code or design files",
        "Final presentation (PPT or PDF) explaining your solution and implementation"
      ]
    },
    {
      title: "Prizes & Selection",
      icon: <Star className="h-6 w-6" />,
      content: [
        "All participants will receive participation certificates",
        "Up to 50 teams may be nominated for SIH 2025",
        "Top performing teams will represent the college in SIH 2025",
        "Winners will receive special recognition and possible additional rewards",
        "Best teams may get mentoring opportunities for further development"
      ]
    },
    {
      title: "After the Event",
      icon: <Lightbulb className="h-6 w-6" />,
      content: [
        "Selected teams will work with College SPOC for SIH 2025 registration process",
        "Teams will receive continued mentoring and guidance",
        "Regular follow-ups to ensure project development continues",
        "Teams must ensure originality of ideas for SIH participation",
        "Additional workshops and training sessions will be organized"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Rules & Regulations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please read all the rules carefully before registering for MVLU Hackathon 2025. 
            These guidelines ensure a fair and productive experience for all participants.
          </p>
        </div>

        {/* Rules Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="bg-yellow-400 rounded-full p-1 mt-1 flex-shrink-0">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
          <div className="flex items-start">
            <div className="bg-yellow-400 rounded-full p-2 mr-4">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
              <p className="text-yellow-700">
                Violation of any rules may result in disqualification. The organizing committee's 
                decision will be final in all matters. For any clarifications, please contact us 
                through the WhatsApp button.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="bg-blue-600 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Ready to Participate?</h3>
            <p className="text-blue-100 mb-6">
              Make sure you understand all the rules and have your team ready!
            </p>
            <a
              href="/registration"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 inline-block"
            >
              Register Your Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;