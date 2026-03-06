const express = require('express');
const router = express.Router();

const syllabus = [
    {
      "anchor": "fbise8math-ch1",
      "title": "Factorization Basics",
      "deck": "demo",
      "tag": "concept",
      "image": "eq.webp"
    },
    {
      "anchor": "fbise8math-ch1",
      "title": "Understanding Factors",
      "deck": "bodmas",
      "tag": "lab",
      "image": "eq.webp"
    },
    {
      "anchor": "fbise8math-ch2",
      "title": "Linear Equation Example",
      "deck": "eq-test",
      "tag": "example",
      "image": "eq.webp"
    }
  ];

const discussion = [
    {
      id: "q1",
      question: "What is Newton’s First Law?",
      answer: "Newton's First Law states that an object remains at rest or continues moving with constant velocity unless an external force acts on it. This means that motion does not require a continuous push. Instead, objects naturally maintain their current state of motion. For example, a hockey puck sliding on smooth ice continues moving for a long time because very little friction acts on it. The law helps us understand why objects do not randomly start or stop moving without a force.",
    
      links: [
        { title: "Lesson: What is Force?", url: "/player?v=what-is-force" },
        { title: "Example: Motion and Friction", url: "/player?v=friction-example" }
      ]
    },
    
    {
      id: "q2",
      question: "What is inertia?",
      answer: "Inertia is the tendency of an object to resist any change in its state of motion. If an object is at rest, inertia keeps it at rest. If it is moving, inertia keeps it moving in the same direction and speed unless a force changes it. Mass is closely related to inertia: heavier objects have greater inertia. That is why pushing a heavy truck is much harder than pushing a bicycle. Understanding inertia helps explain many everyday phenomena such as sudden jerks in vehicles or objects sliding when a surface moves.",
    
      links: [
        { title: "Concept: Mass and Inertia", url: "/player?v=mass-and-inertia" }
      ]
    },
    
    {
      id: "q3",
      question: "Why does a passenger move forward when a bus suddenly stops?",
      answer: "When a bus is moving, the passenger inside is also moving with the same velocity as the bus. If the driver suddenly applies brakes, the bus stops quickly but the passenger's body tends to keep moving forward due to inertia. This forward motion continues until another force acts on the body, such as friction with the seat or contact with a seatbelt. This simple situation clearly demonstrates Newton's First Law in real life.",
    
      links: [
        { title: "Example: Inertia in Vehicles", url: "/player?v=inertia-vehicles" }
      ]
    },
    
    {
      id: "q4",
      question: "Does Newton’s First Law apply only to objects at rest?",
      answer: "No, Newton’s First Law applies equally to objects that are at rest and those that are already moving. The law states that an object will maintain its current state, whether that state is rest or uniform motion. For instance, a satellite moving in space continues moving because no significant external forces are stopping it. Similarly, a stationary book will remain on the table until someone pushes it.",
    
      links: [
        { title: "Lesson: Uniform Motion", url: "/player?v=uniform-motion" }
      ]
    },
    
    {
      id: "q5",
      question: "Is friction related to Newton’s First Law?",
      answer: "Yes, friction is an example of an external force that changes the motion of objects. In everyday situations, friction acts between surfaces and gradually slows down moving objects. Without friction, many objects would keep moving for much longer distances. For example, a sliding box on a smooth floor slows down due to friction between the box and the floor surface.",
    
      links: [
        { title: "Lesson: What is Friction?", url: "/player?v=what-is-friction" },
        { title: "Experiment: Sliding Objects", url: "/player?v=friction-experiment" }
      ]
    },
    
    {
      id: "q6",
      question: "What is an example of Newton’s First Law in daily life?",
      answer: "One simple example is a book lying on a table. The book remains at rest until someone pushes it. Another example is a bicycle moving on a road. Once it gains speed, it continues moving forward even if the rider stops pedaling for a short time. These examples illustrate that motion continues unless an external force such as friction or braking acts on the object.",
    
      links: [
        { title: "Example: Motion of a Bicycle", url: "/player?v=bicycle-motion" }
      ]
    },
    
    {
      id: "q7",
      question: "Why do we wear seat belts in cars?",
      answer: "Seat belts are designed to protect passengers from the effects of inertia during sudden stops or collisions. When a car stops abruptly, the passengers inside tend to keep moving forward due to inertia. The seat belt applies a restraining force that stops the body gradually and prevents serious injury. This safety feature is a direct application of Newton’s First Law in vehicle design.",
    
      links: [
        { title: "Lesson: Safety and Physics", url: "/player?v=physics-safety" }
      ]
    },
    
    {
      id: "q8",
      question: "Is Newton’s First Law also called the Law of Inertia?",
      answer: "Yes, Newton’s First Law is often called the Law of Inertia because it explains the concept of inertia in motion. The law describes how objects resist changes to their state of rest or motion. This principle forms the foundation of classical mechanics and helps scientists understand how forces influence motion in physical systems.",
    
      links: [
        { title: "Concept: Laws of Motion Overview", url: "/player?v=laws-of-motion" }
      ]
    }
    ];
// import deck directly
const deck = require('../../public/decks/what-is-llm.json');

// GET /api/presentation/demo
router.get('/presentation/:vid', (req, res) => {

  const presentation = {
    ...deck,
    syllabus,
    discussion
  };

  res.json(presentation);

});

module.exports = router;