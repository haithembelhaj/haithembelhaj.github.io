const marked = require('marked');

module.exports = {

  title: 'A fullstack develper!',
  description: 'Hi! I\'m a frontend engineer with serious backend skills',
  content: {
    hero: {
      first: 'Hi!',
      second: 'I\'m a frontend engineer with some serious backend skills.'
    },
    about: marked(`
I\'m fluent in ReactJS, NodeJS and PHP and keen to learn the cool new stuff.
      
I'm an expert in web applications but also enjoy creating standalone apis.
      
I have experience with micro services and isomorphic & native apps.
      
I like to build my own tools.
      
I work for digital agencies like [aperto](http://www.aperto.com) and [taikonauten](https://taikonauten.com).
    `),
    contact: marked(`
That's me!
      
I'm currently living in the amazing city of Berlin but also interested in remote work.
      
So check me out!
    `)
  }
}