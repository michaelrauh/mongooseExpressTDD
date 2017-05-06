const subject = require('./intersector')

test('should return an empty array when both are empty', () => {
  expect(subject.intersect([], [])).toEqual([])
})

test('should return nothing if one side is empty', () => {
  var exists = [{
    q: "bar",
    a: "baz"
  }]
  expect(subject.intersect(exists, [])).toEqual([])
  expect(subject.intersect([], exists)).toEqual([])
})

test('should not match objects that are not exactly the same', () => {
  var a = [{
    q: "bar",
    a: "baz"
  }]

  var b = [{
    q: "foo",
    a: "baz"
  }]
  expect(subject.intersect(a, b)).toEqual([])
})

test('should match arrays that are the same', () => {
  var a = [{
    q: "bar",
    a: "baz"
  }]
  expect(subject.intersect(a, a)).toEqual(a)
})

test('should leave extras from either side out', () => {
  var a = [{
      q: "foo",
      a: "baz"
    },
    {
      q: "no",
      a: "yes"
    }
  ]

  var b = [{
      q: "foo",
      a: "baz"
    }]
  expect(subject.intersect(a, b)).toEqual(b)
  expect(subject.intersect(b, a)).toEqual(b)
})

test("should accept arrays with extra on each side", () => {
  var a = [{
      q: "foo",
      a: "baz"
    },
    {
      q: "no",
      a: "yes"
    }
  ]

  var b = [{
      q: "foo",
      a: "baz"
    },
    {
      q: "maybe",
      a: "not"
    }]
    expect(subject.intersect(a, b)).toEqual([{
        q: "foo",
        a: "baz"
      }])
})
