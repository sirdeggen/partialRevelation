# partialRevelation
Merkleized Data Struct in js

## Usage
```javascript
const partialReveal = new ObfuscatedInfo({ first: "Darren", last: "Kellenschwiler", nickname: "Deggen", phone: 123412341234, email: "boop@gmail.com", other: "stuff" })

partialReveal.getValue('first')
partialReveal.root
```

This will expose the value of "first" along with a proof that it belongs to the profile paritalReveal.root.
