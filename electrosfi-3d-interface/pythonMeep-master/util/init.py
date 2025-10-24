import main as m
import sys as s
import argparse as arg
import json
import ast


def main():
    try:
        parser = arg.ArgumentParser(description='Meep Mit Python Middleware')
        parser.add_argument('--data', '-d')
        args = parser.parse_args()
        tree = ast.parse(args.data, mode='eval')
        data = ast.literal_eval(tree)
        print(m.FieldsWaveguide(data))
    except Exception as e:
        print(type(e))
        print(e.args)
        print(e)

    return 0


main()
