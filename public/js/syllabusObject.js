class Syllabus {

    constructor(data){
      this.data = data
    }
  
    getCourse(slug){
      return this.data.courses.find(c => c.slug === slug)
    }
  
    getChapter(slug){
      for(const course of this.data.courses){
        const chapter = course.chapters.find(ch => ch.slug === slug)
        if(chapter) return chapter
      }
      return null
    }
  
    getDeck(deckSlug){
      for(const course of this.data.courses){
        for(const chapter of course.chapters){
          const deck = chapter.decks.find(d => d.slug === deckSlug)
          if(deck){
            return {
              ...deck,
              chapterSlug: chapter.slug,
              courseSlug: course.slug
            }
          }
        }
      }
      return null
    }
  
  }


let syllabus = null

export async function loadSyllabus(){

  const res = await fetch('/api/syllabus')
  const data = await res.json()

  syllabus = new Syllabus(data)

  return syllabus
}

export function getSyllabus(){
  return syllabus
}
