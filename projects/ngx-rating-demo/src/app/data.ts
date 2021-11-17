export const simpleSettings = {
  items: [
    {
      id: 1,
      description: 'ITEM 1 DESCRIPTION',
      color: {
        red: 180,
        green: 230,
        blue: 245
      }
    },
    {
      id: 2,
      description: 'ITEM 2 DESCRIPTION'
    },
    {
      id: 3,
      description: 'ITEM 3 DESCRIPTION',
    },
    {
      id: 4,
      description: 'ITEM 4 DESCRIPTION',
    },
    {
      id: 5,
      description: 'ITEM 5 DESCRIPTION',
      color: {
        red: 0,
        green: 90,
        blue: 141
      }
    },
  ],
  theme: 'rounded_squares',
  itemDetail: {
    width: 70,
    height: 8
  },
  showTitle: true,
  titlePosition: 'top',
  itemMargin: 'auto'
}

export const rainbowSettings = {
  items: [
    {
      id: 1,
      description: 'ITEM 1 DESCRIPTION',
      color: {
        red: 230,
        green: 221,
        blue: 25
      }
    },
    {
      id: 2,
      description: 'ITEM 2 DESCRIPTION'
    },
    {
      id: 3,
      description: 'ITEM 3 DESCRIPTION',
    },
    {
      id: 4,
      description: 'ITEM 4 DESCRIPTION',
      color: {
        red: 32,
        green: 230,
        blue: 55
      }
    },
    {
      id: 5,
      description: 'ITEM 5 DESCRIPTION',
    },
    {
      id: 6,
      description: 'ITEM 6 DESCRIPTION',
    },
    {
      id: 7,
      description: 'ITEM 7 DESCRIPTION',
      color: {
        red: 1,
        green: 151,
        blue: 230
      }
    },
    {
      id: 8,
      description: 'ITEM 8 DESCRIPTION',
    },
    {
      id: 9,
      description: 'ITEM 9 DESCRIPTION',
    },
    {
      id: 10,
      description: 'ITEM 10 DESCRIPTION',
      color: {
        red: 230,
        green: 1,
        blue: 17
      }
    }
  ],
  theme: 'single_icon',
  images: ['../assets/icons/star_black_24dp.svg'],
  itemDetail: {
    width: 50,
    height: 50
  },
  showTitle: true,
  titlePosition: 'right',
  itemMargin: '60'
}

export const facesSettings = {
  items: [
    {
      id: 1,
      description: 'I AM NOT HAPPY',
      color: {
        red: 255,
        green: 246,
        blue: 7
      }
    },
    {
      id: 2,
      description: 'I AM NORMAL'
    },
    {
      id: 3,
      description: 'I AM HAPPY',
    },
    {
      id: 4,
      description: 'I AM VERY HAPPY',
    },
    {
      id: 5,
      description: 'I AM REALLY HAPPY',
      color: {
        red: 255,
        green: 7,
        blue: 36
      }
    },
  ],
  theme: 'multiple_icons',
  images: ['../assets/icons/sentiment_satisfied_alt_black_24dp.svg', '../assets/icons/sentiment_dissatisfied_black_24dp.svg'],
  itemDetail: {
    width: 50,
    height: 50
  },
  showTitle: true,
  titlePosition: 'bottom',
  itemMargin: '70'
}
