const { createHash } = require('crypto')

function sha256d(string) {
    return createHash('sha256')
        .update(createHash('sha256').update(string).digest())
        .digest()
}

function howManyLevels(leaves) {
	return Math.log2(leaves)
}


class ObfuscatedInfo {
    constructor(obj) {
        this.obj = {}
        const paramHashes = Object.keys(obj)
            .sort()
            .map((key, index) => {
				const value = String(obj[key])
                const hash = Buffer.from(sha256d(Buffer.from(value)))
                this.obj[key] = { index, value }
                return hash
            })
		const tree = []
		tree.unshift(paramHashes)
        this.hashEachLevel(paramHashes, tree)
		this.calculateMerklePaths(tree)
		this.root = tree[0][0].toString('hex')
        return this
    }

    hashEachLevel(level, tree) {
        const nextLevel = []
		if (level.length % 2) {
			level.push(level[level.length -1])
		}
        level.map((hash, idx) => {
            if (idx % 2) {
                nextLevel.push(sha256d(Buffer.concat([level[idx - 1], hash])))
            }
            if (idx === level.length - 1) {
                tree.unshift(nextLevel)
                if (nextLevel.length > 1) {
					this.hashEachLevel(nextLevel, tree)
				}
            }
        })
    }

    calculateMerklePaths(tree) {
		Object.keys(this.obj).map((key, idx) => {
			this.obj[key].leaves = this.calculateMerklePath(idx, tree)
		})
	}
	
	calculateMerklePath(index, tree) {
		const leaves = []
		const power = howManyLevels(tree[tree.length - 1].length)
		let indexOffset = 0
		let levelOffset = 1
		let powerMask = power
		let left = !!(index & powerMask)
		do {
			if (left) {
				leaves.push(tree[levelOffset][indexOffset])
				if (indexOffset === 0) {
					indexOffset = 2
				} else {
					indexOffset *= 2
				}
			} else {
				leaves.push(tree[levelOffset][indexOffset + 1])
			}
			levelOffset++
			powerMask--
			left = !!(index & powerMask)
		} while (power >= levelOffset)
		
		return leaves
	}

    getValue(key) {
		const formatted = this.obj[key]
		formatted.leaves = formatted.leaves.map(leaf => leaf.toString('hex'))
        return formatted
    }

}

const partialReveal = new ObfuscatedInfo({ first: "Darren", last: "Kellenschwiler", nickname: "Deggen", phone: 123412341234, email: "boop@gmail.com", other: "stuff" })

partialReveal.getValue('first')
partialReveal.root
