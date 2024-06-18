interface WalletBalance {
    currency: string;
    amount: number;
  }
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
  
  interface Props extends BoxProps {
  
  }
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    //this children props can be removed as it is not be used
    const balances = useWalletBalances();
    const prices = usePrices();
  
    /**OLD */
    //   const getPriority = (blockchain: any): number => {
    //     switch (blockchain) {
    //       case 'Osmosis':
    //         return 100
    //       case 'Ethereum':
    //         return 50
    //       case 'Arbitrum':
    //         return 30
    //       case 'Zilliqa':
    //         return 20
    //       case 'Neo':
    //         return 20
    //       default:
    //         return -99
    //     }
    //   }
    /**NEW:
     * This function does not depend on any props or state so this can be
     * defined in a seperate file or outside the function
     * blockchain must have type string instead of any 
     */
    const getPriority = (blockchain: string): number => {
        switch (blockchain) {
          case 'Osmosis':
            return 100;
          case 'Ethereum':
            return 50;
          case 'Arbitrum':
            return 30;
          case 'Zilliqa':
            return 20;
          case 'Neo':
            return 20;
          default:
            return -99;
        }
      }
  
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
            // const balancePriority = getPriority(balance.blockchain);
            // if (lhsPriority > -99) {
            //    if (balance.amount <= 0) {
            //      return true;
            //    }
            // }
            // return false
            /**NEW 
             * lhsPriority: maybe a incorrect typing
            */
            getPriority(balance.blockchain) > -99 && balance.amount

          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            //   const leftPriority = getPriority(lhs.blockchain);
            // const rightPriority = getPriority(rhs.blockchain);
            // if (leftPriority > rightPriority) {
            //   return -1;
            // } else if (rightPriority > leftPriority) {
            //   return 1;
            // }
            /**NEW
             * This function must be handle when rightPriority = leftPriority
             * I guess this will be sort ascending base on getPriority(blockchain)
             */
            getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      });
    /**OLD */
    // }, [balances, prices]);
    /**NEW
     * prices can be remove as it is not used in this function
     */
    }, [balances, prices]);

    /**OLD */
    // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    //   return {
    //     ...balance,
    //     formatted: balance.amount.toFixed()
    //   }
    // })
    /**NEW:
     * This function is calculated on every render despite sortedBalances are not changed.
     * So we need to wrap this function into useMemo hook. It will calculate when sortedBalances change
     */
    const formattedBalances = useMemo(() => {
        return sortedBalances.map((balance: WalletBalance) => {
          return {
            ...balance,
            formatted: balance.amount.toFixed()
          }
        });
      }, [sortedBalances]);
  
    /**OLD */
    // const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    //   const usdValue = prices[balance.currency] * balance.amount;
    //   return (
    //     <WalletRow 
    //       className={classes.row}
    //       key={index}
    //       amount={balance.amount}
    //       usdValue={usdValue}
    //       formattedAmount={balance.formatted}
    //     />
    //   )
    // })

    /**NEW
     * The same as formattedBalances, row will be also calculated on every render.
     * So we will optimize by wrapping this to useMemo to avoid unnecessary computations.
     * Also, we need to add key for WalletRow that is unique identifier 
     * (not recommend using index as it can lead to unexpected behavior if the items in the list can change order, be added, or removed.)
     */
    const rows = useMemo(() => {
        return formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
          const usdValue = prices[balance.currency] * balance.amount;
          return (
            <WalletRow 
              className={classes.row}
              key={balance.currency} // assuming currency is unique
              amount={balance.amount}
              usdValue={usdValue}
              formattedAmount={balance.formatted}
            />
          )
        });
      }, [formattedBalances, prices]);
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }