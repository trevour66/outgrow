function onOpen(){
  let shUi = SpreadsheetApp.getUi()
      shUi.createMenu('Generate Result')
          .addItem('Lookup Sheet', 'allSheetHandler')
          .addItem('Lookup Row', 'singleRowHandler')
          .addToUi();
}

function getTopFive(categoriesForSorting){
  const categoriesForSortingArr = Object.entries(categoriesForSorting);

  let topFive =  categoriesForSortingArr.sort((a,b)=> {
    return b[1].result - a[1].result 
  })
  .map(el =>{
    return el[0]
  })
  .slice(0,5)

  return topFive
}

function alert(msg){
  let shUi = SpreadsheetApp.getUi()
      shUi.alert(msg)
}

function store(){
  return options = {
    receivingSheetName: 'Sheet1',
    isProcessColumn: 0,
    result1Column: 82,
    result2Column: 83,
    result3Column: 84,
    result4Column: 85,
    result5Column: 86,
    categories:{
      administration: {
        dataColumns: [7,32,57],
        result:0,
        label: 'Administration',
        author: 'St. Maximilian Kolbe',
        description: "Those with this charism are passionate about organizing, often delegating tasks and then bringing the pieces back together for successful completion.  They encounter the movement of the Holy Spirit through organizing and managing resources for a greater purpose."
      },
      craftmanship: {
        dataColumns: [8,33,58],
        result:0,
        label: 'Craftmanship',
        author: 'St. Joseph',
        description: "Those with this charism enjoy using their hands to create a craft, art, or other product which reflect God’s beauty, and they delight in sharing it with others.  They often encounter the movement of the Holy Spirit in their passion to create and this is fulfilling to them."
      },
      digitalCommunications: {
        dataColumns: [9,34,59],
        result:0,
        label: 'Digital Communications',
        author: 'Blessed Carlos Acutis',
        description: "Those with this charism use their abilities through virtual mediums and platforms to inspire hearts in an ever-evolving technological world. They easily navigate virtual methods of connecting, and creatively use digital tools to bring God's goodness into the world and to build the kingdom. They find enriching fulfillment in digital arenas of ministry, evangelization, and marketing."
      },
      discernment: {
        dataColumns: [10,35,60],
        result:0,
        label: 'Discernment',
        author: 'St. Teresa of Avila',
        description: "Those with this charism are enlightened by the Holy Spirit to discover the will of God.  To exercise the gift of discernment is to distinguish between truth and error, to identify whether something is of God. This gift involves knowledge of God and Scripture, and prayerfulness."
      },
      encouragement: {
        dataColumns: [11,36,61],
        result:0,
        label: 'Encouragement',
        author: 'Blessed Pier Giorgio Frassati',
        description: "Those with this charism are endowed with gifts of exceptional listening, helping others to feel heard, seen, and cared for, often leading them to a renewed sense of well-being and new hope. Through the Holy Spirit, they are conduits for God's grace of hope and mercy, and feel energized by these encounters of love."
      },
      evangelism: {
        dataColumns: [12,37,62],
        result:0,
        label: 'Evangelism',
        author: 'St. Patrick',
        description: "Those with this charism are eager to find opportunities to share their faith in Christ and bring others to Christ and His Church.  They are boldly challenged to share the good news of Jesus Christ by integrating faith into daily conversations and actions."
      },
      faith: {
        dataColumns: [13,38,63],
        result:0,
        label: 'Faith',
        author: 'Blessed Mother',
        description: "Those with the charism of faith exhibit exceptional trust in God’s providence and take action with remarkable freedom. Others are often inspired and drawn to Christ through their commitment and example."
      },
      giving: {
        dataColumns: [14,39,64],
        result:0,
        label: 'Giving',
        author: 'St. Katherine Drexel',
        description: "Those with this charism encounter Christ deeply through their generosity to others in need with financial and material resources.  The Holy Spirit animates them to find fulfillment in providing for others."
      },
      globalCulturalAwareness: {
        dataColumns: [15,40,65],
        result:0,
        label: 'Global Cultural Awareness',
        author: 'Blessed Stanley Rother',
        description: "Those with this charism joyfully connect with people of different cultural, ethnic and socio-economic backgrounds, and enhance the community through their gifts.  They feel at home with a sense of belonging and are accepted into the community."
      },
      healing: {
        dataColumns: [16,41,66],
        result:0,
        label: 'Healing',
        author: 'St. Andre Bessette',
        description: "Those with this charism work through the Holy Spirit to help restore and heal people who suffer physically, mentally, emotionally, or spiritually. When they accompany those who suffer, healing occurs more quickly than expected or in remarkable ways.  Their presence is comforting, nurturing, and restorative, revealing the ever-present closeness and providential care of God."
      },
      helping: {
        dataColumns: [17,42,67],
        result:0,
        label: 'Helping',
        author: 'Blessed Michael Sopocko',
        description: "Those with this charism are fueled by supporting another individual to be successful in his/her mission.  There is a desire to do anything, in any way, to assist another in faithfully responding to his/her call.  This is a personal ministry of quiet background service."
      },
      hospitality: {
        dataColumns: [18,43,68],
        result:0,
        label: 'Hospitality',
        author: 'Blessed Solanus Casey',
        description: "Those with this charism thrive for opportunities to create environments of welcome.  They convey to others a sense of belonging, respect, kindness, and promote an atmosphere of 'home'.  They passionately encounter Christ in the stranger and/or feel comfortable bringing people together."
      },
      intercession: {
        dataColumns: [19,44,69],
        result:0,
        label: 'Intercession',
        author: 'St. Therese the Little Flower',
        description: "Those with this charism exhibit a profound trust in the activity of the Holy Spirit interacting in the lives of others, especially those in need.  They feel strongly called to pray and intercede for others with patience, empathy, and compassion, confident that God hears and responds to their prayers."
      },
      knowledge: {
        dataColumns: [20,45,70],
        result:0,
        label: 'Knowledge',
        author: 'St. Thomas Aquinas',
        description: "Those with this charism seek to enrich their faith through study and intellectual undertakings, and enjoy learning things of all kinds.  They encounter Christ though their understanding of God and the world.  They can be inspired by dialogue that reveals the divine reality of God ever-present in their lives."
      },
      leadership: {
        dataColumns: [21,46,71],
        result:0,
        label: 'Leadership',
        author: 'St. John Paul II',
        description: "Those with this charism can uniquely see the God-given gifts of others and empower them, individually and collectively, to use those gifts to bring God's goodness into the world and to build the kingdom.  They keep everyone in a balance as they bring to completion an envisioned work, and often model servant leadership with a deep reverence for the 'other'"
      },
      mercy:{
        dataColumns: [22,47,72],
        result:0,
        label: 'Mercy',
        author: 'St. Mother Teresa of Calcutta',
        description: "Those with this charism are compelled to share uniquely in God’s love and compassion and are moved to respond  in a practical way to the suffering of others, without condition or expectation, to relieve physical, spiritual, or emotional suffering, with charity and personal concern."
      },
      musicianship: {
        dataColumns: [23,48,73],
        result:0,
        label: 'Musicianship',
        author: 'St. Cecilia',
        description: "Those with this charism use their abilities of musical writing and/or performing (vocally/instrumentally) to offer praise and worship to God and for the enjoyment of others.  They passionately experience Christ’s presence and help lead others to encounter God's presence through the gift of music."
      },
      peacemaking: {
        dataColumns: [24,49,74],
        result:0,
        label: 'Peacemaking',
        author: 'St. Catherine of Siena',
        description: "Those with this charism exhibit the ability to mediate between differing viewpoints and bring people together.  Their presence is trustworthy, reliable, and authentic, and they possess skills of incredible patience and active listening."
      },
      prophesy: {
        dataColumns: [25,50,75],
        result:0,
        label: 'Prophesy',
        author: 'St. Padre Pio',
        description: "Those with this charism experience a revelation of God in word, image, or understanding and can articulate truth to an individual or a to a group with great conviction.  Their awareness of God’s close presence gives them the keen ability to communicate a message that stirs hearts to recognize God's message and respond."
      },
      service: {
        dataColumns: [26,51,76],
        result:0,
        label: 'Service',
        author: 'St. Maria Goretti',
        description: "Those with this charism possess a keen ability to see the needs or gaps that will make things better and that others may not notice.  They act on their own to accomplish the tasks and do so behind the scenes.  They encounter God's presence in humble acts of service, and are happy to give time and energy freely for a greater good."
      },
      shepherding: {
        dataColumns: [27,52,77],
        result:0,
        label: 'Shepherding',
        author: 'St. John Vianney',
        description: "Those with this charism nurture and guide others in a group setting as they journey together in their faith.  They develop relationships with those in the group to form and empower them in their relationship with Christ and with one another."
      },
      teaching: {
        dataColumns: [28,53,78],
        result:0,
        label: 'Teaching',
        author: 'St. Jean-Baptist de La Salle',
        description: "Those with this charism possess the ability to clearly communicate information, ideas, concepts and truths in a manner that allows for the personal, spiritual and emotional growth and advancement of an individual or group. They are intentional and focused with a desire to lead people to greater understanding."
      },
      voluntaryPoverty: {
        dataColumns: [29,54,79],
        result:0,
        label: 'Voluntary Poverty',
        author: 'St. Francis of Assisi',
        description: "Those with this charism deeply desire to connect and identify with Jesus and the poor, joyfully exhibiting great simplicity for the benefit of others. This gift provides them with a unique freedom to focus on God's work of helping others."
      },
      wisdom: {
        dataColumns: [30,55,80],
        result:0,
        label: 'Wisdom',
        author: 'St. John of the Cross',
        description: "Those with this charism keenly understand and can offer revealed insight on God’s call and direction in discernment, and use that understanding to recommend the most appropriate plan of action moving forward."
      },
      writing: {
        dataColumns: [31,56,81],
        result:0,
        label: 'Writing',
        author: 'St. Francis de Sales',
        description: 'Those with this charism are moved to compose words through the Holy Spirit that reveal the truth, goodness, and beauty of the human person fully alive. Drafting written compositions come with great ease for those who enjoy this charism, and their words are creatively used to draw others into the divine revelation of God.'
      }
    },
    nameColumn: 2,
    emailColumn: 5,
  }
}





