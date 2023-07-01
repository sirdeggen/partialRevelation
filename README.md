# partialRevelation
Merkleized Data Struct in js

## Usage
```javascript
const partialReveal = new ObfuscatedInfo({ first: "Darren", last: "Kellenschwiler", nickname: "Deggen", phone: 123412341234, email: "boop@gmail.com", other: "stuff" })

partialReveal.getValue('first')
partialReveal.root
```

This will expose the value of "first" along with a proof that it belongs to the profile paritalReveal.root.
```node
{
  index: 1,
  value: 'Darren',
  path: [
    'ddc3bb1da8949bdc381b6634b981fd6ae2853eeb037307f2369ad59a1f1db3a1',
    'd0be549c1399ec5e1183903be29fe3ae652ff632fa6a559377ea2746a1391c98'
  ]
}
> partialReveal.root
'65225719e1c0de66f0662294386ed37e2bb68c3a2917c7d089e187b2ca767892'
```
