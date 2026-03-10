==> alternative method: Why not use AI
what we want to do 1: read question 2: give v small responses 1-3 paras. 3: links decks 1-2 4: link articles 1-2 5: finally decided if this should be published

excellent answer- : this measn let the clean up process begin -
--> here are some og my main --missing pieces ideas
1: the deck-id with the question (mentioned above)
2: the reason the admin/question dashboard can not be made since it will need jsons of list of articles to choose from and list of decks to choose from - these lists must come from workshop/backoffice / content prep project which will be made after this project is compelte for now we have to lock this contract.
3: we are using middle ware for subs do we need middle ware for checking log in ?
4: we need admin/subscription view --- which has a very simple ui - whci allow us to subscribe a student present in db to a subject -- by email - we already have model Subscription
5: each course should have a flag to turn "ask questions" on or off (this is a feature and apparently a very simple one and easy to implement BUT this is how feature creep alwasy is caution).
6: the articles have no subscription restriction - we didnt even consider this properly - articles is a very easy feature to add so we added it but this is not implemented into the system properly.-- this is the only area that i feel is not fully smooth out -
discuss

////////////////////
question 1 : do we need some front-end method which is used centrally to write or read content to cookies - so then we have a know way to check something in cookie if present take action. this will come handy as which current deck is selected in /class and use that deck-id for question.

question 2 : We definitely need to write docs and lock contracts - jsons needed and their API

question 3: Treat articles as:public knowledge -> i did agree - these questions are actually notes -- they become MCQs they are structure and an asset which student has built for us --- so 2 options first : leave articles for now and deal with it later.later we can add them as article "links" in the syllabus under the decks . so there is a deck / video section on top and a reading section on bottom -- for this all we need is course + chapter slug in article nothing more - when the student click deck it go to /class page -- and incase of click on articles the goto the articles page as jsut now but now itis subscription controlled .

--> finally think about articles but lock rest of the system --write contracts and now is the time to create Zod schemas as docs
