[
  {
    'repeat(20)': {
      age: '{{integer(20, 100)}}',
      name: '{{firstName()}} {{surname()}}',
      _id: '{{objectId()}}',
	  email(tags) {
        return `${this.name.replace(" ", "")}@gmail${tags.domainZone()}`.toLowerCase();
      },
      country:'{{country()}}',
    }
  }
]