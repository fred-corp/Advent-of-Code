// Test of day 1 of 2022 in swift

// From a text file, make the sum of the group of numbers separated by a blank line
// and output the largest sum with the number of the group

// parse a text file and return an array of array of numbers

import Foundation

// create a timer wrapper
func measure<A>(_ f: () -> A) -> (A, Double) {
    let start = Date()
    let result = f()
    let end = Date()
    return (result, end.timeIntervalSince(start))
}

func parseFile(_ path: String) -> [[Int]] {
    let file = try! String(contentsOfFile: path)
    let lines = file.components(separatedBy: "\n")
    var groups: [[Int]] = []
    var group: [Int] = []
    for line in lines {
        if line == "" {
            groups.append(group)
            group = []
        } else {
            group.append(Int(line)!)
        }
    }
    groups.append(group)
    return groups
}

// sum the numbers of an array
func sum(_ numbers: [Int]) -> Int {
    return numbers.reduce(0, +)
}

// find the largest sum of the groups
func largestSum(_ groups: [[Int]]) -> (Int, Int) {
    var largest = 0
    var index = 0
    for (i, group) in groups.enumerated() {
        let s = sum(group)
        if s > largest {
            largest = s
            index = i
        }
    }
    return (largest, index)
}

// file is passed as argument
let (groups, time) = measure { parseFile(CommandLine.arguments[1]) }
print("Parsing the file took \(time) seconds")

let ((largest, index), time2) = measure { largestSum(groups) }
print("Finding the largest sum took \(time2) seconds")
print("The largest sum is \(largest) with the group \(index + 1)")


// Find the sum of the 3 largest groups
let (sortedGroups, time3 ) = measure { groups.sorted { sum($0) > sum($1) } }
let sum3 = sum(sortedGroups[0]) + sum(sortedGroups[1]) + sum(sortedGroups[2])
print("Finding the sum of the 3 largest groups took \(time3) seconds")
print("The sum of the 3 largest groups is \(sum3)")
print("")
print("Code executed in \(time + time2 + time3) seconds")